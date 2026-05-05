# Sprint 1: Core Data Layer

**Status:** ✅ COMPLETE  
**Duration:** ~2 hours  
**Priority:** Critical

---

## Overview

Establish the foundation of MoodQuest by creating the core data structures, type system, datasets, and utility functions. This sprint provides the building blocks for all other features.

---

## Goals

1. Define comprehensive TypeScript types for the entire application
2. Create curated datasets of games and movies with rich metadata
3. Build a local scoring algorithm for fallback recommendations
4. Implement localStorage utilities for user feedback and history

---

## Tasks

### ✅ Task 1.1: Type System (`src/lib/types.ts`)

**Status:** COMPLETE  
**File:** `src/lib/types.ts`  
**DO NOT MODIFY:** Yes - This is the foundation for the entire app

#### What Was Created

```typescript
// Core types for recommendation system
- RecommendationType: 'games' | 'movies'
- Mood: Game moods (Relaxing, Cozy, Competitive, etc.)
- TimeAvailable: Time slots for gaming/watching
- Platform: Gaming platforms
- StreamingPlatform: Movie streaming services
- PlayStyle: Solo, Co-op, Multiplayer, Either
- Genre: Game genres
- MovieGenre: Movie genres

// Interfaces
- UserPreferences: User input structure
- GameRecommendation: Game recommendation output
- MovieRecommendation: Movie recommendation output
- RecommendationResponse: API response structure
```

#### Why This Matters

- **Type Safety:** Ensures data consistency across the entire app
- **IntelliSense:** Provides autocomplete in IDE
- **Documentation:** Types serve as inline documentation
- **Refactoring:** Makes large-scale changes safer

#### Dependencies

- **Used By:** All components, API routes, lib files, tests
- **Imports:** None (base types)

---

### ⏳ Task 1.2: Game Dataset (`src/lib/gameDataset.ts`)

**Status:** TO CREATE  
**File:** `src/lib/gameDataset.ts`  
**Estimated Time:** 30 minutes

#### What to Create

A curated dataset of 20+ games with comprehensive metadata:

```typescript
/**
 * FILE: gameDataset.ts
 * PURPOSE: Curated game database for fallback recommendations
 * 
 * STRUCTURE:
 * Each game includes:
 * - id: unique identifier
 * - title: game name
 * - moods: array of matching moods
 * - platforms: available platforms
 * - genres: game genres
 * - playStyles: solo/co-op/multiplayer
 * - timeFits: suitable session lengths
 * - avoidTags: content warnings
 * - similarTitles: related games
 * 
 * DO NOT MODIFY: Yes (unless adding more games)
 * REASON: Scoring algorithm depends on this structure
 */

export interface GameDataItem {
  id: string;
  title: string;
  moods: string[];
  platforms: string[];
  genres: string[];
  playStyles: string[];
  timeFits: string[];
  avoidTags: string[];
  similarTitles: string[];
}

export const gameDataset: GameDataItem[] = [
  // Include games like:
  // - Stardew Valley
  // - Animal Crossing: New Horizons
  // - Journey
  // - Hades
  // - Celeste
  // - Minecraft
  // - The Legend of Zelda: Breath of the Wild
  // - Mario Kart 8 Deluxe
  // - Portal 2
  // - The Sims 4
  // - Hollow Knight
  // - Overcooked 2
  // - Unpacking
  // - Slay the Spire
  // - Firewatch
  // - Among Us
  // - Spiritfarer
  // - Tetris Effect
  // - Fortnite
  // - Civilization VI
  // ... and more
];
```

#### Requirements

- Minimum 20 games
- Diverse genres and moods
- Accurate metadata
- Include popular and indie titles
- Cover all platforms
- Cover all play styles

#### Used By

- `scoring.ts` - For calculating match scores
- `fallbackRecommendations.ts` - For generating recommendations

---

### ⏳ Task 1.3: Movie Dataset (`src/lib/movieDataset.ts`)

**Status:** TO CREATE  
**File:** `src/lib/movieDataset.ts`  
**Estimated Time:** 30 minutes

#### What to Create

A curated dataset of 20+ movies with comprehensive metadata:

```typescript
/**
 * FILE: movieDataset.ts
 * PURPOSE: Curated movie database for fallback recommendations
 * 
 * STRUCTURE:
 * Each movie includes:
 * - id: unique identifier
 * - title: movie name
 * - moods: array of matching moods
 * - genres: movie genres
 * - watchStyles: viewing contexts
 * - timeFits: runtime categories
 * - avoidTags: content warnings
 * - contentTone: overall feel
 * - similarTitles: related movies
 * 
 * DO NOT MODIFY: Yes (unless adding more movies)
 * REASON: Scoring algorithm depends on this structure
 */

export interface MovieDataItem {
  id: string;
  title: string;
  moods: string[];
  genres: string[];
  watchStyles: string[];
  timeFits: string[];
  avoidTags: string[];
  contentTone: string;
  similarTitles: string[];
}

export const movieDataset: MovieDataItem[] = [
  // Include movies like:
  // - Paddington 2
  // - Spider-Man: Into the Spider-Verse
  // - The Grand Budapest Hotel
  // - Knives Out
  // - The Princess Bride
  // - Everything Everywhere All at Once
  // - Spirited Away
  // - The Social Network
  // - Interstellar
  // - Legally Blonde
  // - Little Women
  // - The Martian
  // - Coco
  // - La La Land
  // - Arrival
  // - Fantastic Mr. Fox
  // - The Truman Show
  // - Hidden Figures
  // - School of Rock
  // - Howl's Moving Castle
  // ... and more
];
```

#### Requirements

- Minimum 20 movies
- Diverse genres and moods
- Accurate metadata
- Include popular and indie films
- Cover different runtimes
- Cover different viewing contexts

#### Used By

- `scoring.ts` - For calculating match scores
- `fallbackRecommendations.ts` - For generating recommendations

---

### ⏳ Task 1.4: Scoring Algorithm (`src/lib/scoring.ts`)

**Status:** TO CREATE  
**File:** `src/lib/scoring.ts`  
**Estimated Time:** 45 minutes

#### What to Create

A sophisticated scoring algorithm that ranks games/movies based on user preferences:

```typescript
/**
 * FILE: scoring.ts
 * PURPOSE: Local recommendation scoring algorithm
 * 
 * ALGORITHM:
 * 1. Calculate individual scores (mood, time, platform, genre)
 * 2. Apply mode-specific weights
 * 3. Apply penalties for avoid tags
 * 4. Calculate overall confidence score
 * 5. Return top 3 recommendations
 * 
 * MODES:
 * - Quick Match: Prioritize time and platform
 * - Deep Match: Prioritize mood and genre
 * - Surprise Me: Add randomness to scores
 * 
 * DO NOT MODIFY: Yes (unless fixing bugs)
 * REASON: Core recommendation logic
 */

// Weight configurations for each mode
const WEIGHTS = {
  'Quick Match': { mood: 0.3, time: 0.4, platform: 0.2, genre: 0.1 },
  'Deep Match': { mood: 0.4, time: 0.2, platform: 0.2, genre: 0.2 },
  'Surprise Me': { mood: 0.25, time: 0.25, platform: 0.25, genre: 0.25 }
};

// Main scoring functions
export function scoreGames(games: GameDataItem[], prefs: UserPreferences): GameRecommendation[]
export function scoreMovies(movies: MovieDataItem[], prefs: UserPreferences): MovieRecommendation[]

// Helper functions
function calculateMoodScore(itemMoods: string[], userMood: string): number
function calculateTimeScore(itemTimes: string[], userTime: string): number
function calculatePlatformScore(platforms: string[], userPlatform: string): number
function calculateGenreScore(genres: string[], userGenre: string): number
function calculateAvoidPenalty(avoidTags: string[], userAvoid: string[]): number
```

#### Scoring Logic

**Mood Score (0-100):**
- Exact match: 100
- Related mood: 70
- Different mood: 30

**Time Score (0-100):**
- Exact match: 100
- Compatible time: 60
- Incompatible: 20

**Platform Score (0-100):**
- Exact match: 100
- Cross-platform: 50
- Not available: 0

**Genre Score (0-100):**
- "No preference": 80
- Exact match: 100
- Related genre: 60
- Different genre: 40

**Avoid Penalty:**
- Each matching avoid tag: -50 points
- Maximum penalty: -100

**Overall Score:**
```
rawScore = (moodScore * moodWeight) + 
           (timeScore * timeWeight) + 
           (platformScore * platformWeight) + 
           (genreScore * genreWeight)

finalScore = max(0, rawScore - avoidPenalty)
```

#### Used By

- `fallbackRecommendations.ts` - For generating fallback recommendations
- Tests - For validating scoring logic

---

### ⏳ Task 1.5: Storage Utilities (`src/lib/storage.ts`)

**Status:** TO CREATE  
**File:** `src/lib/storage.ts`  
**Estimated Time:** 30 minutes

#### What to Create

localStorage wrapper functions for managing user feedback and history:

```typescript
/**
 * FILE: storage.ts
 * PURPOSE: localStorage utilities for user feedback and history
 * 
 * FEATURES:
 * - Like/dislike recommendations
 * - Save favorite recommendations
 * - Store recommendation history
 * - Clear data functions
 * 
 * STORAGE KEYS:
 * - moodquest_liked_recommendations
 * - moodquest_disliked_recommendations
 * - moodquest_saved_recommendations
 * - moodquest_recommendation_history
 * 
 * DO NOT MODIFY: Yes (unless adding features)
 * REASON: Data persistence layer
 */

// Liked recommendations
export function getLikedRecommendations(): string[]
export function addLikedRecommendation(id: string): void
export function removeLikedRecommendation(id: string): void

// Disliked recommendations
export function getDislikedRecommendations(): string[]
export function addDislikedRecommendation(id: string): void
export function removeDislikedRecommendation(id: string): void

// Saved recommendations
export function getSavedRecommendations(): Recommendation[]
export function addSavedRecommendation(rec: Recommendation): void
export function removeSavedRecommendation(id: string): void
export function isSaved(id: string): boolean

// History
export function getRecommendationHistory(): RecommendationHistory[]
export function addToHistory(history: RecommendationHistory): void
export function clearHistory(): void

// Utilities
export function clearAllData(): void
```

#### Requirements

- Handle SSR (check `typeof window !== 'undefined'`)
- Prevent duplicates
- Limit history to 20 entries
- Parse/stringify JSON safely
- Handle localStorage errors gracefully

#### Used By

- `page.tsx` - For managing user feedback
- `RecommendationCard.tsx` - For like/dislike/save buttons
- `RecommendationHistory.tsx` - For displaying history

---

## Acceptance Criteria

### For Sprint 1 to be Complete:

- [x] `types.ts` exists with all required types
- [ ] `gameDataset.ts` exists with 20+ games
- [ ] `movieDataset.ts` exists with 20+ movies
- [ ] `scoring.ts` exists with working algorithm
- [ ] `storage.ts` exists with all utility functions
- [ ] All files have comprehensive comments
- [ ] All files have proper file headers
- [ ] No TypeScript errors
- [ ] All files follow naming conventions

---

## Testing Checklist

While formal tests come in Sprint 10, verify:

- [ ] Types compile without errors
- [ ] Datasets have correct structure
- [ ] Scoring returns numbers 0-100
- [ ] Storage functions don't crash
- [ ] localStorage keys are consistent

---

## Common Issues & Solutions

### Issue: TypeScript errors in other files
**Solution:** Other files still reference old types. This is expected. They'll be fixed in Sprint 2.

### Issue: Scoring algorithm too simple
**Solution:** Start simple. Can be refined later based on testing.

### Issue: Not enough games/movies
**Solution:** Start with 20. Can add more later.

### Issue: localStorage not working
**Solution:** Check for SSR. Always verify `typeof window !== 'undefined'`.

---

## Next Steps

After completing Sprint 1:
1. Commit all changes: `git add . && git commit -m "feat: complete Sprint 1 - core data layer"`
2. Move to Sprint 2: Validation & Fallback System
3. Update progress in `docs/FILE-STATUS.md`

---

## File Checklist

- [x] `src/lib/types.ts` - Complete
- [ ] `src/lib/gameDataset.ts` - To create
- [ ] `src/lib/movieDataset.ts` - To create
- [ ] `src/lib/scoring.ts` - To create
- [ ] `src/lib/storage.ts` - To create

---

**Sprint 1 Complete When:** All 5 files exist, compile, and have proper documentation.
