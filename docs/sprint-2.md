# Sprint 2: Validation & Fallback System

**Status:** ⏳ PENDING  
**Duration:** ~2 hours  
**Priority:** Critical

---

## Overview

Update the validation system to work with the new type structure and create a unified fallback recommendation engine that uses the scoring algorithm from Sprint 1.

---

## Goals

1. Rewrite validation logic for new UserPreferences structure
2. Create unified fallback system that works for both games and movies
3. Integrate scoring algorithm with fallback recommendations
4. Generate taste profiles from user preferences

---

## Tasks

### Task 2.1: Update Validation (`src/lib/validation.ts`)

**Status:** TO UPDATE  
**File:** `src/lib/validation.ts`  
**Estimated Time:** 45 minutes  
**Priority:** Critical

#### Current State

The existing validation is outdated and references old type properties.

#### What to Update

```typescript
/**
 * FILE: validation.ts
 * PURPOSE: Validate user preferences before API calls
 * 
 * VALIDATES:
 * - Required fields based on recommendation type
 * - Field value constraints
 * - Type correctness
 * 
 * DEPENDENCIES:
 * - types.ts (UserPreferences interface)
 * 
 * USED BY:
 * - PreferenceForm.tsx (client-side validation)
 * - /api/recommend/route.ts (server-side validation)
 * - /api/refine/route.ts (server-side validation)
 * 
 * STATUS: Needs Update
 * DO NOT MODIFY: No - Update as needed
 */

import { UserPreferences } from './types';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validates user preferences before submission
 * 
 * VALIDATION RULES:
 * - type is required (games or movies)
 * - mood is required
 * - timeAvailable is required
 * - For games: platform and playStyle are required
 * - For movies: streamingPlatform and watchStyle are required
 * - preferredGenre is optional
 * - avoid is optional (can be empty array)
 * 
 * @param preferences - User preferences to validate
 * @returns ValidationResult with isValid flag and optional error message
 * 
 * @example
 * const result = validatePreferences(userPrefs);
 * if (!result.isValid) {
 *   console.error(result.error);
 * }
 */
export function validatePreferences(
  preferences: Partial<UserPreferences>
): ValidationResult {
  // Validate type
  if (!preferences.type) {
    return { isValid: false, error: 'Recommendation type is required' };
  }

  if (preferences.type !== 'games' && preferences.type !== 'movies') {
    return { isValid: false, error: 'Invalid recommendation type' };
  }

  // Validate mood
  if (!preferences.mood) {
    return { isValid: false, error: 'Mood is required' };
  }

  // Validate time
  if (!preferences.timeAvailable) {
    return { isValid: false, error: 'Time available is required' };
  }

  // Validate game-specific fields
  if (preferences.type === 'games') {
    if (!preferences.platform) {
      return { isValid: false, error: 'Platform is required for game recommendations' };
    }

    if (!preferences.playStyle) {
      return { isValid: false, error: 'Play style is required for game recommendations' };
    }
  }

  // Validate movie-specific fields
  if (preferences.type === 'movies') {
    if (!preferences.streamingPlatform) {
      return { isValid: false, error: 'Streaming platform is required for movie recommendations' };
    }

    // Note: watchStyle is not in current types, skip for now
  }

  // All validations passed
  return { isValid: true };
}
```

#### Key Changes

1. Check `preferences.type` instead of `preferences.category`
2. Validate based on `type === 'games'` or `type === 'movies'`
3. For games: require `platform` and `playStyle`
4. For movies: require `streamingPlatform`
5. Make `preferredGenre` optional
6. Allow empty `avoid` array

#### Testing Checklist

- [ ] Valid game preferences pass validation
- [ ] Valid movie preferences pass validation
- [ ] Missing type fails validation
- [ ] Missing mood fails validation
- [ ] Missing platform for games fails validation
- [ ] Missing streamingPlatform for movies fails validation
- [ ] Error messages are clear and helpful

---

### Task 2.2: Unified Fallback System (`src/lib/fallbackRecommendations.ts`)

**Status:** TO UPDATE  
**File:** `src/lib/fallbackRecommendations.ts`  
**Estimated Time:** 1 hour  
**Priority:** High

#### Current State

Existing fallback only handles games with hardcoded recommendations.

#### What to Update

```typescript
/**
 * FILE: fallbackRecommendations.ts
 * PURPOSE: Generate recommendations when AI is unavailable
 * 
 * APPROACH:
 * 1. Import game and movie datasets
 * 2. Use scoring algorithm to rank items
 * 3. Generate taste profile from preferences
 * 4. Return top 3 recommendations
 * 
 * DEPENDENCIES:
 * - types.ts (UserPreferences, RecommendationResponse, etc.)
 * - gameDataset.ts (game data)
 * - movieDataset.ts (movie data)
 * - scoring.ts (scoreGames, scoreMovies)
 * 
 * USED BY:
 * - /api/recommend/route.ts (when AI fails or no API key)
 * - /api/refine/route.ts (when AI fails)
 * 
 * STATUS: Needs Major Update
 * DO NOT MODIFY: No - Update as needed
 */

import { UserPreferences, RecommendationResponse, TasteProfile } from './types';
import { gameDataset } from './gameDataset';
import { movieDataset } from './movieDataset';
import { scoreGames, scoreMovies } from './scoring';

/**
 * Generate taste profile from user preferences
 * 
 * Creates a human-readable summary of user's preferences
 * 
 * @param preferences - User preferences
 * @returns TasteProfile object
 */
function generateTasteProfile(preferences: UserPreferences): TasteProfile {
  const isGames = preferences.type === 'games';
  
  // Generate summary based on preferences
  let summary = '';
  if (isGames) {
    summary = `You enjoy ${preferences.mood.toLowerCase()} games`;
    if (preferences.playStyle) {
      summary += ` with ${preferences.playStyle.toLowerCase()} gameplay`;
    }
    if (preferences.timeAvailable) {
      summary += `, perfect for ${preferences.timeAvailable.toLowerCase()} sessions`;
    }
  } else {
    summary = `You prefer ${preferences.mood.toLowerCase()} movies`;
    if (preferences.timeAvailable) {
      summary += ` that fit ${preferences.timeAvailable.toLowerCase()}`;
    }
  }
  
  // Determine avoid pattern
  const avoidPattern = preferences.avoid && preferences.avoid.length > 0
    ? `Avoids ${preferences.avoid.join(', ')}`
    : 'No specific content to avoid';
  
  return {
    summary,
    primaryMood: preferences.mood,
    preferredExperience: isGames 
      ? `${preferences.playStyle || 'Any'} ${preferences.platform || 'platform'} gaming`
      : `${preferences.streamingPlatform || 'Any platform'} viewing`,
    avoidPattern
  };
}

/**
 * Get fallback recommendations using local scoring
 * 
 * PROCESS:
 * 1. Determine if games or movies
 * 2. Load appropriate dataset
 * 3. Score all items using scoring algorithm
 * 4. Return top 3 with taste profile
 * 
 * @param preferences - User preferences
 * @returns RecommendationResponse with 3 recommendations and taste profile
 * 
 * @example
 * const response = getFallbackRecommendations(userPrefs);
 * console.log(response.recommendations); // Array of 3 items
 * console.log(response.tasteProfile.summary);
 */
export function getFallbackRecommendations(
  preferences: UserPreferences
): RecommendationResponse {
  // Generate taste profile
  const tasteProfile = generateTasteProfile(preferences);
  
  // Get recommendations based on type
  let recommendations;
  if (preferences.type === 'games') {
    recommendations = scoreGames(gameDataset, preferences);
  } else {
    recommendations = scoreMovies(movieDataset, preferences);
  }
  
  return {
    tasteProfile,
    recommendations
  };
}
```

#### Key Features

1. **Unified Function:** Single function handles both games and movies
2. **Taste Profile Generation:** Creates personalized summary
3. **Scoring Integration:** Uses Sprint 1 scoring algorithm
4. **Type Safety:** Returns proper RecommendationResponse

#### Implementation Notes

- **IMPORTANT:** This replaces the old fallback system entirely
- Delete `fallbackMovieRecommendations.ts` after this is complete
- Ensure taste profile matches API response format
- Top 3 recommendations should be sorted by confidence score

---

## Acceptance Criteria

### For Sprint 2 to be Complete:

- [ ] `validation.ts` updated with new validation rules
- [ ] Validation handles both games and movies
- [ ] Validation returns clear error messages
- [ ] `fallbackRecommendations.ts` updated to use scoring
- [ ] Fallback works for both games and movies
- [ ] Fallback generates taste profile
- [ ] Fallback returns exactly 3 recommendations
- [ ] All files have updated comments
- [ ] No TypeScript errors
- [ ] Old `fallbackMovieRecommendations.ts` deleted

---

## Testing Checklist

### Validation Tests

Test in browser console or create temporary test file:

```typescript
// Valid game preferences
const gamePrefs = {
  type: 'games',
  mood: 'Relaxing',
  timeAvailable: 'About 1 hour',
  platform: 'PC',
  playStyle: 'Solo',
  preferredGenre: 'Simulation',
  avoid: []
};
console.log(validatePreferences(gamePrefs)); // Should be { isValid: true }

// Valid movie preferences
const moviePrefs = {
  type: 'movies',
  mood: 'Comforting',
  timeAvailable: 'About 2 hours',
  streamingPlatform: 'Netflix',
  preferredMovieGenre: 'Comedy',
  avoid: []
};
console.log(validatePreferences(moviePrefs)); // Should be { isValid: true }

// Invalid - missing platform
const invalidPrefs = {
  type: 'games',
  mood: 'Relaxing',
  timeAvailable: 'About 1 hour'
};
console.log(validatePreferences(invalidPrefs)); // Should have error
```

### Fallback Tests

```typescript
// Test game fallback
const gameResponse = getFallbackRecommendations(gamePrefs);
console.log(gameResponse.recommendations.length); // Should be 3
console.log(gameResponse.tasteProfile.summary); // Should be readable text

// Test movie fallback
const movieResponse = getFallbackRecommendations(moviePrefs);
console.log(movieResponse.recommendations.length); // Should be 3
console.log(movieResponse.tasteProfile.summary); // Should be readable text
```

---

## Common Issues & Solutions

### Issue: TypeScript errors about missing properties
**Solution:** Make sure types.ts includes all required interfaces (TasteProfile, etc.)

### Issue: Fallback returns empty array
**Solution:** Check that datasets are properly imported and not empty

### Issue: Scoring returns NaN
**Solution:** Verify scoring.ts handles edge cases (empty arrays, undefined values)

### Issue: Taste profile is generic
**Solution:** Enhance generateTasteProfile with more personalized text

---

## Dependencies

### This Sprint Depends On:
- Sprint 1 complete (types, datasets, scoring)

### Other Sprints Depend On This:
- Sprint 8 (API routes need validation and fallback)
- Sprint 10 (Tests need updated validation)

---

## File Changes Summary

| File | Action | Lines Changed |
|------|--------|---------------|
| `src/lib/validation.ts` | Update | ~60 lines |
| `src/lib/fallbackRecommendations.ts` | Major rewrite | ~100 lines |
| `src/lib/fallbackMovieRecommendations.ts` | Delete | N/A |

---

## Next Steps

After completing Sprint 2:
1. Test validation with various inputs
2. Test fallback with game and movie preferences
3. Commit changes: `git add . && git commit -m "feat: update validation and fallback system"`
4. Move to Sprint 3: Selection Components
5. Update progress in `docs/FILE-STATUS.md`

---

**Sprint 2 Complete When:** Validation works for both types, fallback generates proper responses with taste profiles.
