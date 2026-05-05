# Sprint 8: API Routes

**Status:** ⏳ PENDING  
**Duration:** ~3 hours  
**Priority:** Critical

---

## Overview

Update the recommendation API route and create a new refinement API route. These are the core backend endpoints that power the entire application.

---

## Goals

1. Update `/api/recommend` to generate taste profiles and handle modes
2. Create `/api/refine` for improving recommendations based on feedback
3. Ensure proper error handling and fallback logic
4. Return consistent JSON responses

---

## Tasks

### Task 8.1: Update Recommendation API (`src/app/api/recommend/route.ts`)

**Status:** TO UPDATE  
**File:** `src/app/api/recommend/route.ts`  
**Estimated Time:** 2 hours  
**Priority:** Critical

#### What to Update

```typescript
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
 * STATUS: Needs Major Update
 * DO NOT MODIFY: No - Update as needed
 */

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
      const fallbackResponse = getFallbackRecommendations(preferences);
      return NextResponse.json(fallbackResponse);
    }

    try {
      // Determine item type
      const isGames = preferences.type === 'games';
      const itemType = isGames ? 'game' : 'movie';
      
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
      "whyItFits": "Explanation",
      "moodMatch": "How it matches mood",
      "timeFit": "How it fits time",
      "platformFit": "Platform availability",
      ${isGames ? '"playStyleFit": "Play style match",' : '"watchStyleFit": "Watch style match",\n      "contentTone": "Content tone",'} 
      "genreFit": "Genre match",
      "similarTitles": ["title1", "title2", "title3"],
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
      const fallbackResponse = getFallbackRecommendations(preferences);
      return NextResponse.json(fallbackResponse);
    }
  } catch (error) {
    console.error('Error in recommend API:', error);
    return NextResponse.json(
      { error: 'Failed to generate recommendations' },
      { status: 500 }
    );
  }
}
```

---

### Task 8.2: Create Refine API (`src/app/api/refine/route.ts`)

**Status:** TO CREATE  
**File:** `src/app/api/refine/route.ts`  
**Estimated Time:** 1 hour  
**Priority:** Medium

#### What to Create

```typescript
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
 * STATUS: To Create
 * DO NOT MODIFY: No - Can be updated as needed
 */

import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { RefineRequest, RecommendationResponse } from '@/lib/types';
import { getFallbackRecommendations } from '@/lib/fallbackRecommendations';

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
      const fallbackResponse = getFallbackRecommendations(originalPreferences);
      return NextResponse.json(fallbackResponse);
    }

    try {
      const isGames = originalPreferences.type === 'games';
      const itemType = isGames ? 'game' : 'movie';

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

Use the same JSON format as before with tasteProfile and 3 recommendations.`;

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
      const fallbackResponse = getFallbackRecommendations(originalPreferences);
      return NextResponse.json(fallbackResponse);
    }
  } catch (error) {
    console.error('Error in refine API:', error);
    return NextResponse.json(
      { error: 'Failed to refine recommendations' },
      { status: 500 }
    );
  }
}
```

---

## Acceptance Criteria

### For Sprint 8 to be Complete:

- [ ] `/api/recommend` updated with taste profile generation
- [ ] `/api/recommend` handles both games and movies
- [ ] `/api/recommend` respects recommendation mode
- [ ] `/api/recommend` falls back gracefully
- [ ] `/api/refine` created
- [ ] `/api/refine` uses feedback to improve recommendations
- [ ] `/api/refine` falls back gracefully
- [ ] Both routes return proper JSON
- [ ] Both routes handle errors properly
- [ ] Comprehensive comments added
- [ ] No TypeScript errors

---

## Testing Checklist

### Test /api/recommend
- [ ] Returns 3 recommendations for games
- [ ] Returns 3 recommendations for movies
- [ ] Includes taste profile
- [ ] Handles missing API key (fallback)
- [ ] Handles invalid preferences (400 error)
- [ ] Handles AI errors (fallback)

### Test /api/refine
- [ ] Returns new recommendations
- [ ] Considers liked items
- [ ] Avoids disliked items
- [ ] Falls back when needed
- [ ] Returns proper JSON

---

## Common Issues & Solutions

### Issue: AI returns invalid JSON
**Solution:** Add better error handling and validation

### Issue: Fallback doesn't match schema
**Solution:** Ensure fallback returns RecommendationResponse type

### Issue: Temperature too high/low
**Solution:** Adjust based on mode (Surprise Me = higher)

---

## Dependencies

### This Sprint Depends On:
- Sprint 1 (types.ts)
- Sprint 2 (validation.ts, fallbackRecommendations.ts)

### Other Sprints Depend On This:
- Sprint 9 (Main app calls these APIs)

---

## Next Steps

After completing Sprint 8:
1. Test both API routes with Postman or curl
2. Verify fallback works
3. Commit: `git add . && git commit -m "feat: update API routes with taste profiles"`
4. Move to Sprint 9: Main Application Flow
5. Update `docs/FILE-STATUS.md`

---

**Sprint 8 Complete When:** Both API routes work correctly and return proper responses.
