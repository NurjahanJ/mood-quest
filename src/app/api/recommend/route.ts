import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { UserPreferences, RecommendationResponse } from '@/lib/types';
import { validatePreferences } from '@/lib/validation';
import { getFallbackRecommendations } from '@/lib/fallbackRecommendations';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const preferences: UserPreferences = await request.json();

    const validation = validatePreferences(preferences);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      console.warn('OpenAI API key not found, using fallback recommendations');
      const fallbackRecs = getFallbackRecommendations(preferences);
      return NextResponse.json({ recommendations: fallbackRecs });
    }

    try {
      const systemPrompt = `You are a game recommendation expert. You must respond ONLY with valid JSON matching this exact schema:

{
  "recommendations": [
    {
      "title": "string",
      "whyItFits": "string",
      "moodMatch": "string",
      "timeFit": "string",
      "platformFit": "string",
      "similarGames": ["string", "string", "string"],
      "confidence": number
    }
  ]
}

Rules:
- Return exactly 3 game recommendations
- Each confidence score must be between 1-100
- similarGames must contain 3 game titles
- All fields are required
- NO additional text outside the JSON structure
- Recommendations must be real, existing games
- Consider the user's mood, time, platform, play style, and preferences
- Be specific and thoughtful in your explanations`;

      const avoidText = preferences.avoid && preferences.avoid.length > 0
        ? `\nAvoid games with: ${preferences.avoid.join(', ')}`
        : '';

      const userPrompt = `Recommend games for a player with these preferences:
- Mood: ${preferences.mood}
- Time Available: ${preferences.timeAvailable}
- Platform: ${preferences.platform}
- Play Style: ${preferences.playStyle}
- Preferred Genre: ${preferences.preferredGenre || 'No preference'}${avoidText}

Provide exactly 3 game recommendations in the specified JSON format.`;

      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.7,
        response_format: { type: 'json_object' },
      });

      const content = completion.choices[0].message.content;
      if (!content) {
        throw new Error('No content in OpenAI response');
      }

      const result: RecommendationResponse = JSON.parse(content);

      if (!result.recommendations || result.recommendations.length !== 3) {
        throw new Error('Invalid response format from OpenAI');
      }

      for (const rec of result.recommendations) {
        if (rec.confidence < 1 || rec.confidence > 100) {
          throw new Error('Invalid confidence score');
        }
      }

      return NextResponse.json(result);
    } catch (aiError) {
      console.error('AI API error, falling back to local recommendations:', aiError);
      const fallbackRecs = getFallbackRecommendations(preferences);
      return NextResponse.json({ recommendations: fallbackRecs });
    }
  } catch (error) {
    console.error('Error in recommend API:', error);
    return NextResponse.json(
      { error: 'Failed to generate recommendations' },
      { status: 500 }
    );
  }
}
