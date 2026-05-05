# File Status Reference

This document tracks which files exist, which need to be created, and which should not be modified.

---

## 🔒 DO NOT MODIFY

These files are complete and should not be changed unless there's a critical bug.

### Configuration Files
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `next.config.js` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `vitest.config.ts` - Vitest testing configuration
- `.gitignore` - Git ignore rules
- `.env.example` - Environment variable template

### Core Type System
- `src/lib/types.ts` - **CRITICAL:** All TypeScript type definitions
  - Contains: RecommendationType, Mood, TimeAvailable, Platform, etc.
  - Used by: All components, API routes, tests
  - **DO NOT MODIFY** without updating all dependent files

---

## ⚠️ NEEDS UPDATE

These files exist but need to be updated for the comprehensive system.

### Validation
- `src/lib/validation.ts`
  - **Current:** Basic validation for old type system
  - **Needs:** Update for new UserPreferences structure
  - **Sprint:** 2

### Fallback System
- `src/lib/fallbackRecommendations.ts`
  - **Current:** Simple fallback for games only
  - **Needs:** Integrate with scoring system, support movies
  - **Sprint:** 2

### API Routes
- `src/app/api/recommend/route.ts`
  - **Current:** Basic AI recommendation endpoint
  - **Needs:** Add taste profile generation, mode handling
  - **Sprint:** 8

### Main Application
- `src/app/page.tsx`
  - **Current:** Simple single-page flow
  - **Needs:** Multi-step flow with category/mode selection
  - **Sprint:** 9

### Tests
- `src/tests/validation.test.ts`
  - **Current:** Tests for old validation
  - **Needs:** Update for new validation rules
  - **Sprint:** 10

- `src/tests/fallbackRecommendations.test.ts`
  - **Current:** Tests for old fallback
  - **Needs:** Update for new fallback with scoring
  - **Sprint:** 10

### Documentation
- `README.md`
  - **Current:** Basic project description
  - **Needs:** Comprehensive documentation
  - **Sprint:** 11

---

## ✨ CREATE NEW

These files need to be created from scratch.

### Data Layer (Sprint 1)
- `src/lib/gameDataset.ts` - 20+ curated games with metadata
- `src/lib/movieDataset.ts` - 20+ curated movies with metadata
- `src/lib/scoring.ts` - Local scoring algorithm
- `src/lib/storage.ts` - localStorage utilities

### Components (Sprints 3-7)
- `src/components/CategorySelector.tsx` - Game vs Movie selection
- `src/components/ModeSelector.tsx` - Quick/Deep/Surprise selection
- `src/components/PreferenceForm.tsx` - Dynamic form (replaces old)
- `src/components/RecommendationCard.tsx` - Enhanced card (replaces old)
- `src/components/ResultsSection.tsx` - Results display (replaces old)
- `src/components/TasteProfile.tsx` - Taste profile display
- `src/components/RecommendationHistory.tsx` - History display
- `src/components/GameComparison.tsx` - Game comparison view
- `src/components/MovieComparison.tsx` - Movie comparison view

### API Routes (Sprint 8)
- `src/app/api/refine/route.ts` - Refinement endpoint

### Tests (Sprint 10)
- `src/tests/scoring.test.ts` - Scoring algorithm tests
- `src/tests/storage.test.ts` - Storage utilities tests

---

## 🗑️ CAN DELETE

These files are from previous iterations and can be safely deleted.

### Old Components
- `src/components/EnhancedPreferenceForm.tsx` - Replaced by new PreferenceForm
- `src/components/EnhancedRecommendationCard.tsx` - Replaced by new RecommendationCard
- `src/components/ProfessionalPreferenceForm.tsx` - Replaced by new PreferenceForm
- `src/components/ProfessionalRecommendationCard.tsx` - Replaced by new RecommendationCard

### Old Fallback
- `src/lib/fallbackMovieRecommendations.ts` - Will be unified in fallbackRecommendations.ts

---

## 📋 File Dependency Map

Understanding which files depend on which:

### types.ts is used by:
- All components
- All lib files
- All API routes
- All tests
- **Impact:** Changes to types.ts affect the entire codebase

### gameDataset.ts is used by:
- scoring.ts
- fallbackRecommendations.ts
- **Impact:** Changes only affect fallback system

### movieDataset.ts is used by:
- scoring.ts
- fallbackRecommendations.ts
- **Impact:** Changes only affect fallback system

### scoring.ts is used by:
- fallbackRecommendations.ts
- Tests
- **Impact:** Changes affect fallback quality

### storage.ts is used by:
- page.tsx
- RecommendationHistory.tsx
- RecommendationCard.tsx
- **Impact:** Changes affect user feedback features

### validation.ts is used by:
- PreferenceForm.tsx
- /api/recommend/route.ts
- /api/refine/route.ts
- **Impact:** Changes affect form submission and API

### fallbackRecommendations.ts is used by:
- /api/recommend/route.ts
- /api/refine/route.ts
- **Impact:** Changes affect fallback behavior

---

## 🔄 Update Order

When making changes, follow this order to avoid breaking dependencies:

1. **types.ts** - Update types first
2. **Datasets** - Create/update game and movie datasets
3. **Utilities** - Create scoring, storage, validation
4. **Fallback** - Update fallback to use new utilities
5. **Components** - Create UI components
6. **API Routes** - Update/create API endpoints
7. **Main App** - Wire everything together in page.tsx
8. **Tests** - Add comprehensive tests
9. **Documentation** - Update README

---

## 📝 Comment Requirements

Every file must include:

### File Header
```typescript
/**
 * FILE: filename.tsx
 * PURPOSE: What this file does
 * 
 * DEPENDENCIES:
 * - List of key imports and why
 * 
 * USED BY:
 * - List of files that import this
 * 
 * STATUS: [Complete | In Progress | Needs Update]
 * 
 * DO NOT MODIFY: [Yes/No]
 * REASON: [If yes, explain why]
 */
```

### Function Documentation
```typescript
/**
 * Brief description of what the function does
 * 
 * @param paramName - Description of parameter
 * @returns Description of return value
 * 
 * @example
 * functionName(exampleParam)
 * // returns exampleOutput
 */
```

### Complex Logic
```typescript
// EXPLANATION: Why this logic is necessary
// APPROACH: How it works
// EDGE CASES: What to watch out for
```

---

## 🚨 Critical Files

These files are critical to the application and require extra care:

### High Impact
- `src/lib/types.ts` - Entire app depends on this
- `src/app/api/recommend/route.ts` - Core functionality
- `src/lib/validation.ts` - Data integrity

### Medium Impact
- `src/lib/scoring.ts` - Fallback quality
- `src/lib/storage.ts` - User experience
- `src/app/page.tsx` - User flow

### Low Impact
- Individual components - Can be updated independently
- Tests - Don't affect runtime
- Documentation - Don't affect functionality

---

## ✅ Checklist Before Modifying Files

Before editing any file, ask:

1. ✓ Have I read the file header comments?
2. ✓ Do I understand what depends on this file?
3. ✓ Have I checked if this file is marked "DO NOT MODIFY"?
4. ✓ Will my changes break any dependent files?
5. ✓ Have I updated the file header if status changed?
6. ✓ Have I added comments for new logic?
7. ✓ Have I updated tests if behavior changed?

---

## 📊 Progress Tracking

| File | Status | Sprint | Priority |
|------|--------|--------|----------|
| types.ts | ✅ Complete | 1 | Critical |
| gameDataset.ts | ⏳ To Create | 1 | High |
| movieDataset.ts | ⏳ To Create | 1 | High |
| scoring.ts | ⏳ To Create | 1 | High |
| storage.ts | ⏳ To Create | 1 | High |
| validation.ts | ⚠️ Needs Update | 2 | Critical |
| fallbackRecommendations.ts | ⚠️ Needs Update | 2 | High |
| CategorySelector.tsx | ⏳ To Create | 3 | Medium |
| ModeSelector.tsx | ⏳ To Create | 3 | Medium |
| PreferenceForm.tsx | ⏳ To Create | 4 | High |
| RecommendationCard.tsx | ⏳ To Create | 5 | High |
| ResultsSection.tsx | ⏳ To Create | 6 | Medium |
| TasteProfile.tsx | ⏳ To Create | 6 | Medium |
| RecommendationHistory.tsx | ⏳ To Create | 6 | Low |
| GameComparison.tsx | ⏳ To Create | 7 | Low |
| MovieComparison.tsx | ⏳ To Create | 7 | Low |
| /api/recommend/route.ts | ⚠️ Needs Update | 8 | Critical |
| /api/refine/route.ts | ⏳ To Create | 8 | Medium |
| page.tsx | ⚠️ Needs Update | 9 | Critical |
| Tests | ⚠️ Needs Update | 10 | High |
| README.md | ⚠️ Needs Update | 11 | Medium |

---

Last Updated: Sprint 1 Complete
