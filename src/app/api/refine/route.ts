/**
 * FILE: /api/refine/route.ts
 * PURPOSE: Refine recommendations based on user feedback
 * 
 * PROCESS:
 * 1. Accept original preferences + feedback
 * 2. Build refined prompt with feedback context
 * 3. Call OpenAI with adjusted parameters
 * 4. Return improved recommendations
 * 5. Fall back to local scoring if AI fails
 * 
 * DEPENDENCIES:
 * - types.ts (RefineRequest, RecommendationResponse)
 * - fallbackRecommendations.ts (getFallbackRecommendations)
 * - OpenAI SDK
 * 
 * USED BY:
 * - page.tsx (when user clicks "Refine Recommendations")
 * 
 * STATUS: Complete
 * DO NOT MODIFY: No - Can be updated as needed
 */

import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { RefineRequest, RecommendationResponse } from '@/lib/types';
import { getFallbackRecommendations, generateTasteProfile } from '@/lib/fallbackRecommendations';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const refineRequest: RefineRequest = await request.json();
    const { originalPreferences, likedRecommendations, dislikedRecommendations } = refineRequest;

    // If no API key, use fallback
    if (!process.env.OPENAI_API_KEY) {
      console.warn('OpenAI API key not found, using fallback recommendations');
      const fallbackRecs = getFallbackRecommendations(originalPreferences);
      const tasteProfile = {
        summary: generateTasteProfile(originalPreferences),
        primaryMood: originalPreferences.mood,
        preferredExperience: originalPreferences.type === 'games' ? `${originalPreferences.playStyle} ${originalPreferences.preferredGenre || 'gaming'}` : `${originalPreferences.preferredMovieGenre || 'movie'} watching`,
        avoidPattern: originalPreferences.avoid && originalPreferences.avoid.length > 0 ? originalPreferences.avoid.join(', ') : 'None specified'
      };
      return NextResponse.json({ recommendations: fallbackRecs, tasteProfile });
    }

    try {
      const isGames = originalPreferences.type === 'games';
      const itemType = isGames ? 'game' : 'movie';
      const similarField = isGames ? 'similarGames' : 'similarMovies';

      // Build feedback context
      let feedbackContext = '';
      if (likedRecommendations.length > 0) {
        feedbackContext += `\nUser LIKED: ${likedRecommendations.join(', ')}`;
      }
      if (dislikedRecommendations.length > 0) {
        feedbackContext += `\nUser DISLIKED: ${dislikedRecommendations.join(', ')}`;
      }

      const systemPrompt = `You are refining ${itemType} recommendations based on user feedback.

${feedbackContext}

Provide NEW recommendations that:
- Are similar to liked ${itemType}s
- Avoid patterns from disliked ${itemType}s
- Still match original preferences
- Are different from previous recommendations

Use the same JSON format as before with tasteProfile and 3 recommendations.

RESPONSE FORMAT (strict JSON):
{
  "tasteProfile": {
    "summary": "Updated summary based on feedback",
    "primaryMood": "${originalPreferences.mood}",
    "preferredExperience": "Refined experience description",
    "avoidPattern": "Updated avoid pattern"
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
}`;

      const userPrompt = `Original preferences:
- Mood: ${originalPreferences.mood}
- Time: ${originalPreferences.timeAvailable}
${isGames ? `- Platform: ${originalPreferences.platform}\n- Play Style: ${originalPreferences.playStyle}` : `- Streaming: ${originalPreferences.streamingPlatform}`}

Provide 3 NEW ${itemType} recommendations based on the feedback.`;

      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.8,
        response_format: { type: 'json_object' },
      });

      const content = completion.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No response from OpenAI');
      }

      const result: RecommendationResponse = JSON.parse(content);

      if (!result.recommendations || result.recommendations.length !== 3) {
        throw new Error('Invalid response format');
      }

      return NextResponse.json(result);
    } catch (aiError) {
      console.error('AI API error in refine, falling back:', aiError);
      const fallbackRecs = getFallbackRecommendations(originalPreferences);
      const tasteProfile = {
        summary: generateTasteProfile(originalPreferences),
        primaryMood: originalPreferences.mood,
        preferredExperience: originalPreferences.type === 'games' ? `${originalPreferences.playStyle} ${originalPreferences.preferredGenre || 'gaming'}` : `${originalPreferences.preferredMovieGenre || 'movie'} watching`,
        avoidPattern: originalPreferences.avoid && originalPreferences.avoid.length > 0 ? originalPreferences.avoid.join(', ') : 'None specified'
      };
      return NextResponse.json({ recommendations: fallbackRecs, tasteProfile });
    }
  } catch (error) {
    console.error('Error in refine API:', error);
    return NextResponse.json(
      { error: 'Failed to refine recommendations' },
      { status: 500 }
    );
  }
}
