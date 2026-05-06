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
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      console.warn('OpenAI API key not found, using fallback recommendations');
      const recommendations = getFallbackRecommendations(preferences);
      return NextResponse.json({ recommendations } as RecommendationResponse);
    }

    try {
      const isGames = preferences.type === 'games';

      const systemPrompt = isGames
        ? `You are a game recommendation expert. Respond ONLY with valid JSON:
{
  "recommendations": [
    {
      "id": "unique-slug",
      "category": "game",
      "title": "string",
      "whyItFits": "string",
      "moodMatch": "string",
      "timeFit": "string",
      "platformFit": "string",
      "similarGames": ["string", "string", "string"],
      "confidence": number (1-100)
    }
  ]
}
Return exactly 3 game recommendations. Be specific and thoughtful.`
        : `You are a movie recommendation expert. Respond ONLY with valid JSON:
{
  "recommendations": [
    {
      "id": "unique-slug",
      "category": "movie",
      "title": "string",
      "year": number,
      "whyItFits": "string",
      "moodMatch": "string",
      "timeFit": "string",
      "platformFit": "string",
      "similarMovies": ["string", "string", "string"],
      "confidence": number (1-100)
    }
  ]
}
Return exactly 3 movie recommendations. Be specific and thoughtful.`;

      const avoidText = preferences.avoid && preferences.avoid.length > 0
        ? `\nAvoid: ${preferences.avoid.join(', ')}`
        : '';

      let userPrompt: string;
      if (isGames) {
        userPrompt = `Recommend games for:
- Mood: ${preferences.mood}
- Time: ${preferences.timeAvailable}
- Platform: ${preferences.platform}
- Play Style: ${preferences.playStyle}
- Genre: ${preferences.preferredGenre || 'No preference'}${avoidText}`;
      } else {
        userPrompt = `Recommend movies for:
- Mood: ${preferences.mood}
- Time: ${preferences.timeAvailable}
- Streaming: ${preferences.streamingPlatform || 'Any'}
- Genre: ${preferences.preferredMovieGenre || 'No preference'}${avoidText}`;
      }

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
      if (!content) throw new Error('No content in OpenAI response');

      const result: RecommendationResponse = JSON.parse(content);

      if (!result.recommendations || result.recommendations.length === 0) {
        throw new Error('Invalid response format from OpenAI');
      }

      return NextResponse.json(result);
    } catch (aiError) {
      console.error('AI API error, falling back:', aiError);
      const recommendations = getFallbackRecommendations(preferences);
      return NextResponse.json({ recommendations } as RecommendationResponse);
    }
  } catch (error) {
    console.error('Error in recommend API:', error);
    return NextResponse.json(
      { error: 'Failed to generate recommendations' },
      { status: 500 }
    );
  }
}
