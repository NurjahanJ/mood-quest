# Sprint 5: Enhanced Recommendation Card

**Status:** ⏳ PENDING  
**Duration:** ~2 hours  
**Priority:** High

---

## Overview

Create an enhanced recommendation card component that displays individual recommendations with detailed information, scoring breakdowns, and user feedback buttons (like, dislike, save).

---

## Goals

1. Build a comprehensive recommendation card component
2. Display all recommendation details clearly
3. Show confidence scores with visual indicators
4. Add feedback buttons (like, dislike, save)
5. Handle both game and movie recommendations

---

## Tasks

### Task 5.1: Enhanced Recommendation Card (`src/components/RecommendationCard.tsx`)

**Status:** TO CREATE (REPLACES OLD VERSION)  
**File:** `src/components/RecommendationCard.tsx`  
**Estimated Time:** 2 hours  
**Priority:** High

#### What to Create

```typescript
/**
 * FILE: RecommendationCard.tsx
 * PURPOSE: Display individual recommendation with feedback options
 * 
 * FEATURES:
 * - Shows all recommendation details
 * - Displays confidence score with color coding
 * - Shows individual score breakdowns (mood, time, platform, genre)
 * - Like/Dislike/Save buttons
 * - Different layouts for games vs movies
 * - Professional card design
 * 
 * DEPENDENCIES:
 * - types.ts (GameRecommendation, MovieRecommendation)
 * - storage.ts (for checking saved status)
 * 
 * USED BY:
 * - ResultsSection.tsx (displays multiple cards)
 * 
 * STATUS: To Create
 * DO NOT MODIFY: No - Can be updated for UI improvements
 */

'use client';

import { useState, useEffect } from 'react';
import { GameRecommendation, MovieRecommendation } from '@/lib/types';
import { isSaved } from '@/lib/storage';

interface RecommendationCardProps {
  recommendation: GameRecommendation | MovieRecommendation;
  index: number;
  onLike: (id: string) => void;
  onDislike: (id: string) => void;
  onSave: (recommendation: GameRecommendation | MovieRecommendation) => void;
}

/**
 * RecommendationCard Component
 * 
 * Displays a single recommendation with all details and feedback options.
 * 
 * DESIGN:
 * - Card with header showing rank and title
 * - Confidence score badge with color coding
 * - Main description (whyItFits)
 * - Score breakdowns in grid
 * - Similar titles section
 * - Feedback buttons at bottom
 * 
 * COLOR CODING:
 * - 90-100: Green (Excellent match)
 * - 75-89: Blue (Good match)
 * - 60-74: Yellow (Decent match)
 * - Below 60: Orange (Okay match)
 * 
 * @param recommendation - The recommendation to display
 * @param index - Position in list (0-2)
 * @param onLike - Callback when user likes
 * @param onDislike - Callback when user dislikes
 * @param onSave - Callback when user saves
 */
export default function RecommendationCard({
  recommendation,
  index,
  onLike,
  onDislike,
  onSave
}: RecommendationCardProps) {
  const [saved, setSaved] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  // Check if already saved
  useEffect(() => {
    setSaved(isSaved(recommendation.id));
  }, [recommendation.id]);

  /**
   * Get confidence badge color based on score
   * 
   * @param confidence - Score from 0-100
   * @returns Tailwind classes for badge styling
   */
  const getConfidenceBadge = (confidence: number): string => {
    if (confidence >= 90) return 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400';
    if (confidence >= 75) return 'border-blue-500/50 bg-blue-500/10 text-blue-400';
    if (confidence >= 60) return 'border-amber-500/50 bg-amber-500/10 text-amber-400';
    return 'border-orange-500/50 bg-orange-500/10 text-orange-400';
  };

  /**
   * Handle like button click
   * Removes dislike if previously disliked
   */
  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setDisliked(false);
      onLike(recommendation.id);
    }
  };

  /**
   * Handle dislike button click
   * Removes like if previously liked
   */
  const handleDislike = () => {
    if (!disliked) {
      setDisliked(true);
      setLiked(false);
      onDislike(recommendation.id);
    }
  };

  /**
   * Handle save button click
   * Toggles saved state
   */
  const handleSave = () => {
    setSaved(!saved);
    onSave(recommendation);
  };

  // Determine if this is a game or movie
  const isGame = 'similarGames' in recommendation;
  const similarItems = isGame 
    ? (recommendation as GameRecommendation).similarGames 
    : (recommendation as MovieRecommendation).similarMovies;

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 hover:border-gray-700 transition-all duration-300 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <span className="flex items-center justify-center w-10 h-10 bg-white text-gray-900 rounded-full font-bold text-lg">
              {index + 1}
            </span>
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-white">
                {recommendation.title}
              </h3>
              {/* Show year for movies */}
              {'year' in recommendation && recommendation.year && (
                <p className="text-sm text-gray-500 mt-1">{recommendation.year}</p>
              )}
            </div>
          </div>
          <div className={`px-4 py-2 rounded-lg border ${getConfidenceBadge(recommendation.confidence)}`}>
            <div className="text-center">
              <div className="text-2xl font-bold">{recommendation.confidence}</div>
              <div className="text-xs uppercase tracking-wider opacity-75">Match</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Why It Fits */}
        <div>
          <p className="text-gray-300 leading-relaxed">
            {recommendation.whyItFits}
          </p>
        </div>

        {/* Score Breakdowns */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Mood Match
            </div>
            <div className="text-sm text-gray-300">
              {recommendation.moodMatch}
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Time Fit
            </div>
            <div className="text-sm text-gray-300">
              {recommendation.timeFit}
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Platform
            </div>
            <div className="text-sm text-gray-300">
              {recommendation.platformFit}
            </div>
          </div>
        </div>

        {/* Game-specific: Play Style */}
        {isGame && 'playStyleFit' in recommendation && (
          <div className="space-y-1">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Play Style
            </div>
            <div className="text-sm text-gray-300">
              {recommendation.playStyleFit}
            </div>
          </div>
        )}

        {/* Movie-specific: Watch Style and Content Tone */}
        {!isGame && 'watchStyleFit' in recommendation && (
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Watch Style
              </div>
              <div className="text-sm text-gray-300">
                {recommendation.watchStyleFit}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Content Tone
              </div>
              <div className="text-sm text-gray-300">
                {recommendation.contentTone}
              </div>
            </div>
          </div>
        )}

        {/* Genre */}
        <div className="space-y-1">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Genre
          </div>
          <div className="text-sm text-gray-300">
            {recommendation.genreFit}
          </div>
        </div>

        {/* Similar Titles */}
        <div className="pt-4 border-t border-gray-800">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
            Similar {isGame ? 'Games' : 'Movies'}
          </div>
          <div className="flex flex-wrap gap-2">
            {similarItems.map((item, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 bg-gray-800 text-gray-400 rounded text-sm border border-gray-700 hover:border-gray-600 hover:text-gray-300 transition-colors"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Feedback Buttons */}
        <div className="pt-4 border-t border-gray-800">
          <div className="flex gap-3">
            <button
              onClick={handleLike}
              className={`flex-1 px-4 py-3 rounded-lg border transition-all ${
                liked
                  ? 'border-green-500 bg-green-500/20 text-green-400'
                  : 'border-gray-700 bg-gray-800 text-gray-400 hover:border-green-500 hover:text-green-400'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <span className="text-xl">{liked ? '❤️' : '🤍'}</span>
                <span className="text-sm font-medium">Like</span>
              </span>
            </button>

            <button
              onClick={handleDislike}
              className={`flex-1 px-4 py-3 rounded-lg border transition-all ${
                disliked
                  ? 'border-red-500 bg-red-500/20 text-red-400'
                  : 'border-gray-700 bg-gray-800 text-gray-400 hover:border-red-500 hover:text-red-400'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <span className="text-xl">✕</span>
                <span className="text-sm font-medium">Not for me</span>
              </span>
            </button>

            <button
              onClick={handleSave}
              className={`flex-1 px-4 py-3 rounded-lg border transition-all ${
                saved
                  ? 'border-blue-500 bg-blue-500/20 text-blue-400'
                  : 'border-gray-700 bg-gray-800 text-gray-400 hover:border-blue-500 hover:text-blue-400'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <span className="text-xl">{saved ? '🔖' : '📑'}</span>
                <span className="text-sm font-medium">Save</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

#### Key Features

1. **Comprehensive Display:** Shows all recommendation details
2. **Visual Hierarchy:** Clear sections with proper spacing
3. **Confidence Badge:** Color-coded based on score
4. **Feedback Buttons:** Like, dislike, and save functionality
5. **Responsive:** Works on mobile and desktop
6. **Type-Safe:** Handles both games and movies correctly

---

## Acceptance Criteria

### For Sprint 5 to be Complete:

- [ ] `RecommendationCard.tsx` created
- [ ] Card displays all recommendation details
- [ ] Confidence badge shows correct color
- [ ] Like button works and shows state
- [ ] Dislike button works and shows state
- [ ] Save button works and shows state
- [ ] Like and dislike are mutually exclusive
- [ ] Game-specific fields show for games
- [ ] Movie-specific fields show for movies
- [ ] Similar titles display correctly
- [ ] Card is responsive on mobile
- [ ] Comprehensive comments added
- [ ] No TypeScript errors

---

## Testing Checklist

### Visual Testing
- [ ] Card renders without errors
- [ ] Confidence badge color matches score
- [ ] All text is readable
- [ ] Layout doesn't break on mobile
- [ ] Hover states work smoothly

### Functionality Testing
- [ ] Like button toggles state
- [ ] Dislike button toggles state
- [ ] Save button toggles state
- [ ] Liking removes dislike
- [ ] Disliking removes like
- [ ] Callbacks are called with correct ID
- [ ] Saved state persists (checks localStorage)

### Type Testing
- [ ] Game recommendations show play style
- [ ] Movie recommendations show watch style and tone
- [ ] Similar games/movies show correctly
- [ ] Year shows for movies (if present)

---

## Common Issues & Solutions

### Issue: Feedback buttons don't update
**Solution:** Ensure state is managed correctly with useState

### Issue: Saved state doesn't persist
**Solution:** Check that isSaved() is called in useEffect

### Issue: Layout breaks with long text
**Solution:** Use proper text wrapping and overflow handling

### Issue: TypeScript errors on recommendation types
**Solution:** Use type guards to check game vs movie

---

## Dependencies

### This Sprint Depends On:
- Sprint 1 (types.ts with recommendation interfaces)
- Sprint 1 (storage.ts for isSaved function)

### Other Sprints Depend On This:
- Sprint 6 (ResultsSection uses this card)
- Sprint 9 (Main app displays cards)

---

## Next Steps

After completing Sprint 5:
1. Test card with sample data
2. Verify feedback buttons work
3. Test on mobile devices
4. Commit: `git add . && git commit -m "feat: add enhanced recommendation card"`
5. Move to Sprint 6: Results & Profile Components
6. Update `docs/FILE-STATUS.md`

---

**Sprint 5 Complete When:** Card displays all details, feedback buttons work, and design is professional.
