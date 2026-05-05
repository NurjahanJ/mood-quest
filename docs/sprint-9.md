# Sprint 9: Main Application Flow

**Status:** ⏳ PENDING  
**Duration:** ~3 hours  
**Priority:** Critical

---

## Overview

Wire everything together in the main page component. This sprint integrates all previous components into a cohesive multi-step user flow.

---

## Goals

1. Implement multi-step flow (category → mode → form → results)
2. Manage all application state
3. Handle API calls to recommend and refine endpoints
4. Integrate localStorage for feedback and history
5. Create smooth user experience

---

## Tasks

### Task 9.1: Main Application Page (`src/app/page.tsx`)

**Status:** TO UPDATE (MAJOR REWRITE)  
**File:** `src/app/page.tsx`  
**Estimated Time:** 3 hours  
**Priority:** Critical

#### What to Update

```typescript
/**
 * FILE: page.tsx
 * PURPOSE: Main application page with complete user flow
 * 
 * FLOW:
 * Step 1: Category selection (games vs movies)
 * Step 2: Mode selection (Quick/Deep/Surprise)
 * Step 3: Preference form
 * Step 4: Results display with taste profile
 * 
 * STATE MANAGEMENT:
 * - currentStep: Which step user is on
 * - category: Selected category
 * - mode: Selected mode
 * - preferences: User preferences
 * - recommendations: API results
 * - tasteProfile: Generated profile
 * - feedback: Liked/disliked/saved items
 * - loading/error states
 * 
 * DEPENDENCIES:
 * - All components from previous sprints
 * - types.ts
 * - storage.ts
 * 
 * STATUS: Needs Major Rewrite
 * DO NOT MODIFY: No - Update as needed
 */

'use client';

import { useState } from 'react';
import CategorySelector from '@/components/CategorySelector';
import ModeSelector from '@/components/ModeSelector';
import PreferenceForm from '@/components/PreferenceForm';
import ResultsSection from '@/components/ResultsSection';
import TasteProfile from '@/components/TasteProfile';
import RecommendationHistory from '@/components/RecommendationHistory';
import {
  RecommendationType,
  RecommendationMode,
  UserPreferences,
  GameRecommendation,
  MovieRecommendation,
  TasteProfile as TasteProfileType,
  RecommendationResponse
} from '@/lib/types';
import {
  addLikedRecommendation,
  addDislikedRecommendation,
  addSavedRecommendation,
  removeSavedRecommendation,
  getSavedRecommendations,
  addToHistory
} from '@/lib/storage';

export default function Home() {
  // Step management
  const [currentStep, setCurrentStep] = useState(1);
  
  // User selections
  const [category, setCategory] = useState<RecommendationType | null>(null);
  const [mode, setMode] = useState<RecommendationMode | null>(null);
  
  // Recommendations
  const [recommendations, setRecommendations] = useState<(GameRecommendation | MovieRecommendation)[] | null>(null);
  const [tasteProfile, setTasteProfile] = useState<TasteProfileType | null>(null);
  
  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Feedback tracking
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [dislikedIds, setDislikedIds] = useState<string[]>([]);

  /**
   * Handle category selection
   * Moves to step 2 (mode selection)
   */
  const handleCategorySelect = (selectedCategory: RecommendationType) => {
    setCategory(selectedCategory);
    setCurrentStep(2);
  };

  /**
   * Handle mode selection
   * Moves to step 3 (preference form)
   */
  const handleModeSelect = (selectedMode: RecommendationMode) => {
    setMode(selectedMode);
    setCurrentStep(3);
  };

  /**
   * Handle form submission
   * Calls /api/recommend and moves to step 4 (results)
   */
  const handleFormSubmit = async (preferences: UserPreferences) => {
    setIsLoading(true);
    setError(null);
    setRecommendations(null);
    setTasteProfile(null);

    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferences),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get recommendations');
      }

      const data: RecommendationResponse = await response.json();
      
      setRecommendations(data.recommendations);
      setTasteProfile(data.tasteProfile);
      setCurrentStep(4);

      // Add to history
      if (data.recommendations.length > 0) {
        const saved = getSavedRecommendations();
        const savedTitles = saved.map(s => s.title);
        
        addToHistory({
          id: Date.now().toString(),
          date: new Date().toISOString(),
          category: preferences.category,
          mood: preferences.mood,
          topRecommendation: data.recommendations[0].title,
          savedTitles
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle like action
   * Adds to liked list, removes from disliked
   */
  const handleLike = (id: string) => {
    addLikedRecommendation(id);
    setLikedIds([...likedIds, id]);
    setDislikedIds(dislikedIds.filter(did => did !== id));
  };

  /**
   * Handle dislike action
   * Adds to disliked list, removes from liked
   */
  const handleDislike = (id: string) => {
    addDislikedRecommendation(id);
    setDislikedIds([...dislikedIds, id]);
    setLikedIds(likedIds.filter(lid => lid !== id));
  };

  /**
   * Handle save action
   * Toggles save status
   */
  const handleSave = (recommendation: GameRecommendation | MovieRecommendation) => {
    const saved = getSavedRecommendations();
    const exists = saved.find(s => s.id === recommendation.id);
    
    if (exists) {
      removeSavedRecommendation(recommendation.id);
    } else {
      addSavedRecommendation(recommendation);
    }
  };

  /**
   * Handle refine recommendations
   * Calls /api/refine with feedback
   */
  const handleRefine = async () => {
    if (!category || !mode) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/refine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          originalPreferences: {
            category,
            mode,
            // Include other preferences from last submission
          },
          likedRecommendations: likedIds,
          dislikedRecommendations: dislikedIds,
          savedRecommendations: getSavedRecommendations().map(s => s.id)
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to refine recommendations');
      }

      const data: RecommendationResponse = await response.json();
      
      setRecommendations(data.recommendations);
      setTasteProfile(data.tasteProfile);
      
      // Reset feedback for new recommendations
      setLikedIds([]);
      setDislikedIds([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refine');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Reset to start
   */
  const handleStartOver = () => {
    setCurrentStep(1);
    setCategory(null);
    setMode(null);
    setRecommendations(null);
    setTasteProfile(null);
    setError(null);
    setLikedIds([]);
    setDislikedIds([]);
  };

  return (
    <main className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            MoodQuest
          </h1>
          <p className="text-xl text-gray-400">
            Find your next game or movie based on your mood
          </p>
        </div>

        {/* Progress Indicator */}
        {currentStep > 1 && (
          <div className="mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`h-2 w-16 rounded-full ${
                    step <= currentStep ? 'bg-white' : 'bg-gray-800'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={handleStartOver}
              className="block mx-auto text-sm text-gray-500 hover:text-white transition-colors"
            >
              Start Over
            </button>
          </div>
        )}

        {/* Step 1: Category Selection */}
        {currentStep === 1 && (
          <CategorySelector onSelect={handleCategorySelect} />
        )}

        {/* Step 2: Mode Selection */}
        {currentStep === 2 && mode === null && (
          <ModeSelector onSelect={handleModeSelect} />
        )}

        {/* Step 3: Preference Form */}
        {currentStep === 3 && category && mode && (
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-8">
            <PreferenceForm
              category={category}
              mode={mode}
              onSubmit={handleFormSubmit}
              isLoading={isLoading}
            />
          </div>
        )}

        {/* Step 4: Results */}
        {currentStep === 4 && (
          <div className="space-y-8">
            {tasteProfile && <TasteProfile profile={tasteProfile} />}
            
            <ResultsSection
              recommendations={recommendations}
              isLoading={isLoading}
              error={error}
              onLike={handleLike}
              onDislike={handleDislike}
              onSave={handleSave}
              onRefine={handleRefine}
            />

            {/* History Sidebar (optional) */}
            <div className="mt-12">
              <RecommendationHistory />
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-24 text-center text-gray-600 text-sm">
          <p>Powered by OpenAI • Built with Next.js & TypeScript</p>
        </footer>
      </div>
    </main>
  );
}
```

---

## Acceptance Criteria

### For Sprint 9 to be Complete:

- [ ] `page.tsx` updated with multi-step flow
- [ ] Step 1 (category selection) works
- [ ] Step 2 (mode selection) works
- [ ] Step 3 (form) works
- [ ] Step 4 (results) works
- [ ] Progress indicator shows current step
- [ ] Start over button resets flow
- [ ] API calls work correctly
- [ ] Feedback buttons update state
- [ ] Refine recommendations works
- [ ] History is saved after each session
- [ ] Error handling works
- [ ] Loading states display correctly
- [ ] Comprehensive comments added
- [ ] No TypeScript errors

---

## Testing Checklist

### Complete User Flow
- [ ] Select category → advances to step 2
- [ ] Select mode → advances to step 3
- [ ] Fill form → submits and shows results
- [ ] Results display with taste profile
- [ ] Like/dislike/save buttons work
- [ ] Refine button calls API
- [ ] History saves session
- [ ] Start over resets everything

### Error Handling
- [ ] API errors show error message
- [ ] Network errors are handled
- [ ] Invalid responses are caught
- [ ] User can recover from errors

### State Management
- [ ] State persists within session
- [ ] Feedback is tracked correctly
- [ ] localStorage updates properly
- [ ] No memory leaks

---

## Common Issues & Solutions

### Issue: State not updating
**Solution:** Check useState hooks and ensure state updates are immutable

### Issue: API calls failing
**Solution:** Verify API routes are running, check network tab

### Issue: History not saving
**Solution:** Ensure addToHistory is called after successful API response

### Issue: Steps not advancing
**Solution:** Check currentStep state updates

---

## Dependencies

### This Sprint Depends On:
- All previous sprints (1-8)
- All components must be complete

### Other Sprints Depend On This:
- Sprint 10 (Testing needs working app)
- Sprint 11 (Documentation references final app)

---

## Next Steps

After completing Sprint 9:
1. Test complete user flow multiple times
2. Test with both games and movies
3. Verify all features work
4. Commit: `git add . && git commit -m "feat: implement main application flow"`
5. Move to Sprint 10: Testing
6. Update `docs/FILE-STATUS.md`

---

**Sprint 9 Complete When:** Complete user flow works from category selection to results with all features functional.
