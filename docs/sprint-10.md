# Sprint 10: Testing

**Status:** ⏳ PENDING  
**Duration:** ~3 hours  
**Priority:** High

---

## Overview

Create comprehensive automated tests for all critical functionality. This ensures code quality and prevents regressions.

---

## Goals

1. Test scoring algorithm
2. Test fallback recommendations
3. Test validation logic
4. Test storage utilities
5. Achieve >80% coverage for lib/ folder

---

## Tasks

### Task 10.1: Scoring Tests (`src/tests/scoring.test.ts`)

**Status:** TO CREATE  
**File:** `src/tests/scoring.test.ts`  
**Estimated Time:** 1 hour  
**Priority:** High

#### What to Create

```typescript
/**
 * FILE: scoring.test.ts
 * PURPOSE: Test scoring algorithm for games and movies
 * 
 * TESTS:
 * - Game scoring returns ranked results
 * - Movie scoring returns ranked results
 * - Avoid tags reduce scores
 * - Scores are within valid range (0-100)
 * - Mode affects scoring weights
 * - Top 3 recommendations are returned
 * 
 * STATUS: To Create
 */

import { describe, it, expect } from 'vitest';
import { scoreGames, scoreMovies } from '@/lib/scoring';
import { gameDataset } from '@/lib/gameDataset';
import { movieDataset } from '@/lib/movieDataset';
import { UserPreferences } from '@/lib/types';

describe('Game Scoring', () => {
  it('should return exactly 3 game recommendations', () => {
    const preferences: UserPreferences = {
      category: 'game',
      mode: 'Quick Match',
      mood: 'Relaxing',
      timeAvailable: 'About 1 hour',
      platform: 'PC',
      playStyle: 'Solo',
      preferredGenre: 'Simulation',
      avoid: []
    };

    const results = scoreGames(gameDataset, preferences);
    expect(results).toHaveLength(3);
  });

  it('should return scores between 0 and 100', () => {
    const preferences: UserPreferences = {
      category: 'game',
      mode: 'Deep Match',
      mood: 'Competitive',
      timeAvailable: 'Several hours',
      platform: 'PlayStation',
      playStyle: 'Multiplayer',
      preferredGenre: 'Action',
      avoid: []
    };

    const results = scoreGames(gameDataset, preferences);
    
    results.forEach(rec => {
      expect(rec.confidence).toBeGreaterThanOrEqual(0);
      expect(rec.confidence).toBeLessThanOrEqual(100);
      expect(rec.scores.mood).toBeGreaterThanOrEqual(0);
      expect(rec.scores.mood).toBeLessThanOrEqual(100);
      expect(rec.scores.time).toBeGreaterThanOrEqual(0);
      expect(rec.scores.time).toBeLessThanOrEqual(100);
    });
  });

  it('should penalize games with avoid tags', () => {
    const withoutAvoid: UserPreferences = {
      category: 'game',
      mode: 'Quick Match',
      mood: 'Chaotic',
      timeAvailable: 'About 1 hour',
      platform: 'PC',
      playStyle: 'Multiplayer',
      preferredGenre: 'Action',
      avoid: []
    };

    const withAvoid: UserPreferences = {
      ...withoutAvoid,
      avoid: ['violence', 'horror']
    };

    const resultsWithout = scoreGames(gameDataset, withoutAvoid);
    const resultsWith = scoreGames(gameDataset, withAvoid);

    // At least one game should have lower score with avoid tags
    const hasLowerScores = resultsWith.some((rec, idx) => 
      rec.confidence < resultsWithout[idx].confidence
    );
    
    expect(hasLowerScores).toBe(true);
  });

  it('should include all required fields', () => {
    const preferences: UserPreferences = {
      category: 'game',
      mode: 'Surprise Me',
      mood: 'Cozy',
      timeAvailable: 'Under 30 minutes',
      platform: 'Nintendo Switch',
      playStyle: 'Solo',
      preferredGenre: 'Puzzle',
      avoid: []
    };

    const results = scoreGames(gameDataset, preferences);
    
    results.forEach(rec => {
      expect(rec).toHaveProperty('id');
      expect(rec).toHaveProperty('category');
      expect(rec).toHaveProperty('title');
      expect(rec).toHaveProperty('whyItFits');
      expect(rec).toHaveProperty('moodMatch');
      expect(rec).toHaveProperty('timeFit');
      expect(rec).toHaveProperty('platformFit');
      expect(rec).toHaveProperty('playStyleFit');
      expect(rec).toHaveProperty('genreFit');
      expect(rec).toHaveProperty('similarTitles');
      expect(rec).toHaveProperty('confidence');
      expect(rec).toHaveProperty('scores');
    });
  });
});

describe('Movie Scoring', () => {
  it('should return exactly 3 movie recommendations', () => {
    const preferences: UserPreferences = {
      category: 'movie',
      mode: 'Quick Match',
      mood: 'Comforting',
      timeAvailable: 'About 2 hours',
      streamingPlatform: 'Netflix',
      preferredMovieGenre: 'Comedy',
      avoid: []
    };

    const results = scoreMovies(movieDataset, preferences);
    expect(results).toHaveLength(3);
  });

  it('should return scores between 0 and 100', () => {
    const preferences: UserPreferences = {
      category: 'movie',
      mode: 'Deep Match',
      mood: 'Suspenseful',
      timeAvailable: 'Long movie is okay',
      streamingPlatform: 'HBO Max',
      preferredMovieGenre: 'Thriller',
      avoid: []
    };

    const results = scoreMovies(movieDataset, preferences);
    
    results.forEach(rec => {
      expect(rec.confidence).toBeGreaterThanOrEqual(0);
      expect(rec.confidence).toBeLessThanOrEqual(100);
    });
  });

  it('should include all required fields', () => {
    const preferences: UserPreferences = {
      category: 'movie',
      mode: 'Surprise Me',
      mood: 'Funny',
      timeAvailable: 'Under 90 minutes',
      streamingPlatform: 'Disney+',
      preferredMovieGenre: 'Animation',
      avoid: []
    };

    const results = scoreMovies(movieDataset, preferences);
    
    results.forEach(rec => {
      expect(rec).toHaveProperty('id');
      expect(rec).toHaveProperty('category');
      expect(rec).toHaveProperty('title');
      expect(rec).toHaveProperty('watchStyleFit');
      expect(rec).toHaveProperty('contentTone');
      expect(rec).toHaveProperty('similarTitles');
    });
  });
});
```

---

### Task 10.2: Fallback Tests (`src/tests/fallbackRecommendations.test.ts`)

**Status:** TO UPDATE  
**File:** `src/tests/fallbackRecommendations.test.ts`  
**Estimated Time:** 45 minutes  
**Priority:** High

#### What to Update

Update existing tests to match new fallback system with taste profiles and scoring integration.

```typescript
/**
 * FILE: fallbackRecommendations.test.ts
 * PURPOSE: Test fallback recommendation system
 * 
 * TESTS:
 * - Returns exactly 3 recommendations
 * - Works for games
 * - Works for movies
 * - Includes taste profile
 * - Matches RecommendationResponse schema
 * 
 * STATUS: Needs Update
 */

import { describe, it, expect } from 'vitest';
import { getFallbackRecommendations } from '@/lib/fallbackRecommendations';
import { UserPreferences } from '@/lib/types';

describe('Fallback Recommendations', () => {
  it('should return exactly 3 game recommendations', () => {
    const preferences: UserPreferences = {
      category: 'game',
      mode: 'Quick Match',
      mood: 'Relaxing',
      timeAvailable: 'About 1 hour',
      platform: 'PC',
      playStyle: 'Solo',
      preferredGenre: 'Simulation',
      avoid: []
    };

    const response = getFallbackRecommendations(preferences);
    
    expect(response.recommendations).toHaveLength(3);
    expect(response.tasteProfile).toBeDefined();
  });

  it('should return exactly 3 movie recommendations', () => {
    const preferences: UserPreferences = {
      category: 'movie',
      mode: 'Deep Match',
      mood: 'Comforting',
      timeAvailable: 'About 2 hours',
      streamingPlatform: 'Netflix',
      preferredMovieGenre: 'Comedy',
      avoid: []
    };

    const response = getFallbackRecommendations(preferences);
    
    expect(response.recommendations).toHaveLength(3);
    expect(response.tasteProfile).toBeDefined();
  });

  it('should include taste profile with all fields', () => {
    const preferences: UserPreferences = {
      category: 'game',
      mode: 'Surprise Me',
      mood: 'Competitive',
      timeAvailable: 'Several hours',
      platform: 'PlayStation',
      playStyle: 'Multiplayer',
      preferredGenre: 'Action',
      avoid: ['horror']
    };

    const response = getFallbackRecommendations(preferences);
    
    expect(response.tasteProfile).toHaveProperty('summary');
    expect(response.tasteProfile).toHaveProperty('primaryMood');
    expect(response.tasteProfile).toHaveProperty('preferredExperience');
    expect(response.tasteProfile).toHaveProperty('avoidPattern');
  });

  it('should match RecommendationResponse schema', () => {
    const preferences: UserPreferences = {
      category: 'movie',
      mode: 'Quick Match',
      mood: 'Funny',
      timeAvailable: 'Under 90 minutes',
      streamingPlatform: 'Hulu',
      preferredMovieGenre: 'Comedy',
      avoid: []
    };

    const response = getFallbackRecommendations(preferences);
    
    expect(response).toHaveProperty('tasteProfile');
    expect(response).toHaveProperty('recommendations');
    expect(Array.isArray(response.recommendations)).toBe(true);
  });
});
```

---

### Task 10.3: Validation Tests (`src/tests/validation.test.ts`)

**Status:** TO UPDATE  
**File:** `src/tests/validation.test.ts`  
**Estimated Time:** 45 minutes  
**Priority:** High

#### What to Update

Update to test new validation rules for category-based validation.

```typescript
/**
 * FILE: validation.test.ts
 * PURPOSE: Test input validation logic
 * 
 * TESTS:
 * - Valid game preferences pass
 * - Valid movie preferences pass
 * - Missing required fields fail
 * - Category-specific validation works
 * 
 * STATUS: Needs Update
 */

import { describe, it, expect } from 'vitest';
import { validatePreferences } from '@/lib/validation';
import { UserPreferences } from '@/lib/types';

describe('Validation', () => {
  it('should pass for valid game preferences', () => {
    const preferences: Partial<UserPreferences> = {
      category: 'game',
      mode: 'Quick Match',
      mood: 'Relaxing',
      timeAvailable: 'About 1 hour',
      platform: 'PC',
      playStyle: 'Solo',
      preferredGenre: 'Simulation',
      avoid: []
    };

    const result = validatePreferences(preferences);
    expect(result.isValid).toBe(true);
  });

  it('should pass for valid movie preferences', () => {
    const preferences: Partial<UserPreferences> = {
      category: 'movie',
      mode: 'Deep Match',
      mood: 'Comforting',
      timeAvailable: 'About 2 hours',
      streamingPlatform: 'Netflix',
      preferredMovieGenre: 'Comedy',
      avoid: []
    };

    const result = validatePreferences(preferences);
    expect(result.isValid).toBe(true);
  });

  it('should fail when category is missing', () => {
    const preferences: Partial<UserPreferences> = {
      mood: 'Relaxing',
      timeAvailable: 'About 1 hour'
    };

    const result = validatePreferences(preferences);
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('category');
  });

  it('should fail when mood is missing', () => {
    const preferences: Partial<UserPreferences> = {
      category: 'game',
      timeAvailable: 'About 1 hour',
      platform: 'PC',
      playStyle: 'Solo'
    };

    const result = validatePreferences(preferences);
    expect(result.isValid).toBe(false);
  });

  it('should fail when platform is missing for games', () => {
    const preferences: Partial<UserPreferences> = {
      category: 'game',
      mood: 'Relaxing',
      timeAvailable: 'About 1 hour',
      playStyle: 'Solo'
    };

    const result = validatePreferences(preferences);
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('platform');
  });

  it('should fail when streaming platform is missing for movies', () => {
    const preferences: Partial<UserPreferences> = {
      category: 'movie',
      mood: 'Comforting',
      timeAvailable: 'About 2 hours'
    };

    const result = validatePreferences(preferences);
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('streaming');
  });
});
```

---

### Task 10.4: Storage Tests (`src/tests/storage.test.ts`)

**Status:** TO CREATE  
**File:** `src/tests/storage.test.ts`  
**Estimated Time:** 30 minutes  
**Priority:** Medium

#### What to Create

```typescript
/**
 * FILE: storage.test.ts
 * PURPOSE: Test localStorage utilities
 * 
 * TESTS:
 * - Add/remove liked recommendations
 * - Add/remove disliked recommendations
 * - Add/remove saved recommendations
 * - History management
 * - Clear functions
 * 
 * STATUS: To Create
 */

import { describe, it, expect, beforeEach } from 'vitest';
import {
  addLikedRecommendation,
  getLikedRecommendations,
  removeLikedRecommendation,
  addDislikedRecommendation,
  getDislikedRecommendations,
  addSavedRecommendation,
  getSavedRecommendations,
  removeSavedRecommendation,
  addToHistory,
  getRecommendationHistory,
  clearHistory,
  clearAllData
} from '@/lib/storage';

describe('Storage Utilities', () => {
  beforeEach(() => {
    clearAllData();
  });

  describe('Liked Recommendations', () => {
    it('should add liked recommendation', () => {
      addLikedRecommendation('game-1');
      const liked = getLikedRecommendations();
      expect(liked).toContain('game-1');
    });

    it('should remove liked recommendation', () => {
      addLikedRecommendation('game-1');
      removeLikedRecommendation('game-1');
      const liked = getLikedRecommendations();
      expect(liked).not.toContain('game-1');
    });

    it('should not add duplicates', () => {
      addLikedRecommendation('game-1');
      addLikedRecommendation('game-1');
      const liked = getLikedRecommendations();
      expect(liked.filter(id => id === 'game-1')).toHaveLength(1);
    });
  });

  describe('History', () => {
    it('should add to history', () => {
      addToHistory({
        id: '1',
        date: new Date().toISOString(),
        category: 'game',
        mood: 'Relaxing',
        topRecommendation: 'Stardew Valley',
        savedTitles: []
      });

      const history = getRecommendationHistory();
      expect(history).toHaveLength(1);
    });

    it('should clear history', () => {
      addToHistory({
        id: '1',
        date: new Date().toISOString(),
        category: 'game',
        mood: 'Relaxing',
        topRecommendation: 'Stardew Valley',
        savedTitles: []
      });

      clearHistory();
      const history = getRecommendationHistory();
      expect(history).toHaveLength(0);
    });
  });
});
```

---

## Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui
```

---

## Acceptance Criteria

### For Sprint 10 to be Complete:

- [ ] `scoring.test.ts` created with comprehensive tests
- [ ] `fallbackRecommendations.test.ts` updated
- [ ] `validation.test.ts` updated
- [ ] `storage.test.ts` created
- [ ] All tests pass
- [ ] Coverage >80% for lib/ folder
- [ ] Tests are well-documented
- [ ] No flaky tests

---

## Next Steps

After completing Sprint 10:
1. Run all tests and verify they pass
2. Check coverage report
3. Fix any failing tests
4. Commit: `git add . && git commit -m "test: add comprehensive test suite"`
5. Move to Sprint 11: Documentation & Polish
6. Update `docs/FILE-STATUS.md`

---

**Sprint 10 Complete When:** All tests pass and coverage goals are met.
