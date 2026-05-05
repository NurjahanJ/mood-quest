/**
 * FILE: /api/recommend/route.ts
 * PURPOSE: Generate AI-powered recommendations with fallback
 * 
 * PROCESS:
 * 1. Validate user preferences
 * 2. Check for OpenAI API key
 * 3. Generate taste profile
 * 4. Call OpenAI with dynamic prompts
 * 5. Parse and validate AI response
 * 6. Return recommendations + taste profile
 * 7. Fall back to local scoring if AI fails
 * 
 * DEPENDENCIES:
 * - types.ts (UserPreferences, RecommendationResponse)
 * - validation.ts (validatePreferences)
 * - fallbackRecommendations.ts (getFallbackRecommendations)
 * - OpenAI SDK
 * 
 * USED BY:
 * - page.tsx (main recommendation flow)
 * 
 * STATUS: Complete
 * DO NOT MODIFY: No - Update as needed
 */

import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { UserPreferences, RecommendationResponse } from '@/lib/types';
import { validatePreferences } from '@/lib/validation';
import { getFallbackRecommendations, generateTasteProfile } from '@/lib/fallbackRecommendations';


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});



export async function POST(request: NextRequest) {
  try {
    const preferences: UserPreferences = await request.json();

    // Validate preferences
    const validation = validatePreferences(preferences);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // If no API key, use fallback immediately
    if (!process.env.OPENAI_API_KEY) {
      console.warn('OpenAI API key not found, using fallback recommendations');
      const fallbackRecs = getFallbackRecommendations(preferences);
      const tasteProfile = {
        summary: generateTasteProfile(preferences),
        primaryMood: preferences.mood,
        preferredExperience: preferences.type === 'games' ? `${preferences.playStyle} ${preferences.preferredGenre || 'gaming'}` : `${preferences.preferredMovieGenre || 'movie'} watching`,
        avoidPattern: preferences.avoid && preferences.avoid.length > 0 ? preferences.avoid.join(', ') : 'None specified'
      };
      return NextResponse.json({ recommendations: fallbackRecs, tasteProfile });
    }



    try {
      // Determine item type
      const isGames = preferences.type === 'games';
      const itemType = isGames ? 'game' : 'movie';
      const similarField = isGames ? 'similarGames' : 'similarMovies';
      
      // Build system prompt
      const systemPrompt = `You are a ${itemType} recommendation expert. Generate a taste profile and 3 recommendations.

RESPONSE FORMAT (strict JSON):
{
  "tasteProfile": {
    "summary": "Brief summary of user's preferences",
    "primaryMood": "${preferences.mood}",
    "preferredExperience": "Description of preferred experience",
    "avoidPattern": "What user wants to avoid"
  },
  "recommendations": [
    {
      "id": "unique-id",
      "category": "${itemType}",
      "title": "Title",
      ${isGames ? '' : '"year": 2020,'}
      "whyItFits": "Explanation",
      "moodMatch": "How it matches mood",
      "timeFit": "How it fits time",
      "platformFit": "Platform availability",
      ${isGames ? '"playStyleFit": "Play style match",' : '"watchStyleFit": "Watch style match",\n      "contentTone": "Content tone",'}
      "genreFit": "Genre match",
      "${similarField}": ["title1", "title2", "title3"],
      "confidence": 85,
      "scores": {
        "mood": 90,
        "time": 80,
        ${isGames ? '"platform": 100,' : ''}
        "genre": 85,
        "overall": 88
      }
    }
  ]
}

RULES:
- Return exactly 3 recommendations
- All scores must be 1-100
- Recommendations must be real, existing ${itemType}s
- Be specific and thoughtful
- Consider mode: ${preferences.mode}`;

      // Build user prompt
      const avoidText = preferences.avoid && preferences.avoid.length > 0
        ? `\nAvoid: ${preferences.avoid.join(', ')}`
        : '';

      let userPrompt = '';
      if (isGames) {
        userPrompt = `Recommend games:
- Mood: ${preferences.mood}
- Time: ${preferences.timeAvailable}
- Platform: ${preferences.platform}
- Play Style: ${preferences.playStyle}
- Genre: ${preferences.preferredGenre || 'No preference'}${avoidText}
- Mode: ${preferences.mode}`;
      } else {
        userPrompt = `Recommend movies:
- Mood: ${preferences.mood}
- Time: ${preferences.timeAvailable}
- Streaming: ${preferences.streamingPlatform}
- Genre: ${preferences.preferredMovieGenre || 'No preference'}${avoidText}
- Mode: ${preferences.mode}`;
      }


      // Call OpenAI
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: preferences.mode === 'Surprise Me' ? 0.9 : 0.7,
        response_format: { type: 'json_object' },
      });

      const content = completion.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No response from OpenAI');
      }

      const result: RecommendationResponse = JSON.parse(content);

      // Validate response
      if (!result.recommendations || result.recommendations.length !== 3) {
        throw new Error('Invalid response format from OpenAI');
      }

      if (!result.tasteProfile) {
        throw new Error('Missing taste profile in response');
      }

      return NextResponse.json(result);
    } catch (aiError) {
      console.error('AI API error, falling back to local recommendations:', aiError);
      const fallbackRecs = getFallbackRecommendations(preferences);
      const tasteProfile = {
        summary: generateTasteProfile(preferences),
        primaryMood: preferences.mood,
        preferredExperience: preferences.type === 'games' ? `${preferences.playStyle} ${preferences.preferredGenre || 'gaming'}` : `${preferences.preferredMovieGenre || 'movie'} watching`,
        avoidPattern: preferences.avoid && preferences.avoid.length > 0 ? preferences.avoid.join(', ') : 'None specified'
      };
      return NextResponse.json({ recommendations: fallbackRecs, tasteProfile });
    }
  } catch (error) {
    console.error('Error in recommend API:', error);
    return NextResponse.json(
      { error: 'Failed to generate recommendations' },
      { status: 500 }
    );
  }
}

