# Sprint 3: Selection Components

**Status:** ⏳ PENDING  
**Duration:** ~2 hours  
**Priority:** Medium

---

## Overview

Create the category and mode selection components that allow users to choose between games/movies and select their recommendation mode (Quick Match, Deep Match, or Surprise Me).

---

## Goals

1. Build CategorySelector for choosing games vs movies
2. Build ModeSelector for choosing recommendation mode
3. Create professional, clean UI components
4. Implement proper state management and callbacks

---

## Tasks

### Task 3.1: Category Selector (`src/components/CategorySelector.tsx`)

**Status:** TO CREATE  
**File:** `src/components/CategorySelector.tsx`  
**Estimated Time:** 1 hour  
**Priority:** Medium

#### What to Create

```typescript
/**
 * FILE: CategorySelector.tsx
 * PURPOSE: Allow users to choose between game or movie recommendations
 * 
 * FEATURES:
 * - Two large, clickable cards
 * - Game Quest option
 * - Movie Quest option
 * - Clear descriptions
 * - Visual feedback on selection
 * 
 * DEPENDENCIES:
 * - types.ts (RecommendationType)
 * 
 * USED BY:
 * - page.tsx (main application flow)
 * 
 * STATUS: To Create
 * DO NOT MODIFY: No - Can be updated for UI improvements
 */

'use client';

import { RecommendationType } from '@/lib/types';

interface CategorySelectorProps {
  onSelect: (category: RecommendationType) => void;
}

/**
 * CategorySelector Component
 * 
 * Displays two options for users to choose their recommendation type.
 * 
 * DESIGN:
 * - Two side-by-side cards (responsive: stack on mobile)
 * - Each card has icon, title, and description
 * - Hover effects for interactivity
 * - Clear visual hierarchy
 * 
 * @param onSelect - Callback when user selects a category
 * 
 * @example
 * <CategorySelector onSelect={(category) => setCategory(category)} />
 */
export default function CategorySelector({ onSelect }: CategorySelectorProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">
          What are you looking for?
        </h2>
        <p className="text-gray-400 text-lg">
          Choose your quest type to get started
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Game Quest Card */}
        <button
          onClick={() => onSelect('games')}
          className="group bg-gray-900 rounded-lg border-2 border-gray-800 p-8 hover:border-white transition-all duration-300 text-left"
        >
          <div className="text-5xl mb-4">🎮</div>
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-white transition-colors">
            Game Quest
          </h3>
          <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
            Find a game that fits your mood, time, and play style.
          </p>
        </button>

        {/* Movie Quest Card */}
        <button
          onClick={() => onSelect('movies')}
          className="group bg-gray-900 rounded-lg border-2 border-gray-800 p-8 hover:border-white transition-all duration-300 text-left"
        >
          <div className="text-5xl mb-4">🎬</div>
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-white transition-colors">
            Movie Quest
          </h3>
          <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
            Find a movie that matches your mood, genre preference, and viewing style.
          </p>
        </button>
      </div>
    </div>
  );
}
```

#### Design Requirements

- **Professional:** Clean, not childish
- **Dark theme:** Black background, gray cards
- **Responsive:** Stack on mobile, side-by-side on desktop
- **Interactive:** Clear hover states
- **Accessible:** Keyboard navigation support

#### Component Props

```typescript
interface CategorySelectorProps {
  onSelect: (category: RecommendationType) => void;
}
```

---

### Task 3.2: Mode Selector (`src/components/ModeSelector.tsx`)

**Status:** TO CREATE  
**File:** `src/components/ModeSelector.tsx`  
**Estimated Time:** 1 hour  
**Priority:** Medium

#### What to Create

```typescript
/**
 * FILE: ModeSelector.tsx
 * PURPOSE: Allow users to choose their recommendation mode
 * 
 * MODES:
 * - Quick Match: Fast, practical recommendations
 * - Deep Match: Detailed reasoning, stronger personalization
 * - Surprise Me: Unexpected picks that still match preferences
 * 
 * DEPENDENCIES:
 * - types.ts (RecommendationMode)
 * 
 * USED BY:
 * - page.tsx (main application flow)
 * 
 * STATUS: To Create
 * DO NOT MODIFY: No - Can be updated for UI improvements
 */

'use client';

import { RecommendationMode } from '@/lib/types';

interface ModeSelectorProps {
  onSelect: (mode: RecommendationMode) => void;
}

/**
 * ModeSelector Component
 * 
 * Displays three recommendation mode options for users to choose from.
 * 
 * DESIGN:
 * - Three cards in a row (responsive: stack on mobile)
 * - Each card has icon, title, and description
 * - Hover effects for interactivity
 * - Clear visual distinction between modes
 * 
 * @param onSelect - Callback when user selects a mode
 * 
 * @example
 * <ModeSelector onSelect={(mode) => setMode(mode)} />
 */
export default function ModeSelector({ onSelect }: ModeSelectorProps) {
  const modes = [
    {
      id: 'Quick Match' as RecommendationMode,
      icon: '⚡',
      title: 'Quick Match',
      description: 'Fast, practical recommendations based on your time and platform.'
    },
    {
      id: 'Deep Match' as RecommendationMode,
      icon: '🎯',
      title: 'Deep Match',
      description: 'More detailed reasoning and stronger personalization.'
    },
    {
      id: 'Surprise Me' as RecommendationMode,
      icon: '✨',
      title: 'Surprise Me',
      description: 'Unexpected picks that still match your preferences.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">
          Choose your match style
        </h2>
        <p className="text-gray-400 text-lg">
          How would you like us to find recommendations?
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => onSelect(mode.id)}
            className="group bg-gray-900 rounded-lg border-2 border-gray-800 p-6 hover:border-white transition-all duration-300 text-left"
          >
            <div className="text-4xl mb-3">{mode.icon}</div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white transition-colors">
              {mode.title}
            </h3>
            <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
              {mode.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
```

#### Design Requirements

- **Consistent:** Match CategorySelector styling
- **Clear:** Each mode's purpose is obvious
- **Responsive:** Stack on mobile, row on desktop
- **Interactive:** Smooth hover transitions

#### Component Props

```typescript
interface ModeSelectorProps {
  onSelect: (mode: RecommendationMode) => void;
}
```

---

## Type Requirements

Both components need these types to be defined in `types.ts`:

```typescript
// Should already exist from Sprint 1
export type RecommendationType = 'games' | 'movies';

// Need to add if not present
export type RecommendationMode = 'Quick Match' | 'Deep Match' | 'Surprise Me';
```

**ACTION:** If `RecommendationMode` doesn't exist in types.ts, add it before creating these components.

---

## Acceptance Criteria

### For Sprint 3 to be Complete:

- [ ] `CategorySelector.tsx` created
- [ ] `ModeSelector.tsx` created
- [ ] Both components have proper TypeScript types
- [ ] Both components have comprehensive comments
- [ ] Both components are responsive
- [ ] Both components have hover states
- [ ] Both components call onSelect callback correctly
- [ ] No TypeScript errors
- [ ] Components follow design system (dark theme, professional)

---

## Testing Checklist

### Manual Testing

Create a temporary test page or add to existing page.tsx:

```typescript
// Test CategorySelector
<CategorySelector 
  onSelect={(category) => console.log('Selected:', category)} 
/>

// Test ModeSelector
<ModeSelector 
  onSelect={(mode) => console.log('Selected:', mode)} 
/>
```

Verify:
- [ ] Clicking Game Quest logs 'games'
- [ ] Clicking Movie Quest logs 'movies'
- [ ] Clicking Quick Match logs 'Quick Match'
- [ ] Clicking Deep Match logs 'Deep Match'
- [ ] Clicking Surprise Me logs 'Surprise Me'
- [ ] Hover states work smoothly
- [ ] Components are responsive on mobile
- [ ] Text is readable
- [ ] Layout doesn't break

---

## Design Specifications

### Colors
- Background: `bg-gray-900`
- Border default: `border-gray-800`
- Border hover: `border-white`
- Text primary: `text-white`
- Text secondary: `text-gray-400`
- Text hover: `text-gray-300`

### Spacing
- Card padding: `p-6` to `p-8`
- Gap between cards: `gap-6`
- Margin bottom for headers: `mb-12`

### Typography
- Main heading: `text-4xl font-bold`
- Card title: `text-xl` to `text-2xl font-bold`
- Description: `text-sm` to `text-lg`

### Transitions
- Duration: `duration-300`
- Easing: Default (ease)

---

## Common Issues & Solutions

### Issue: Types not found
**Solution:** Ensure `RecommendationMode` is exported from types.ts

### Issue: Hover states not working
**Solution:** Check that `group` and `group-hover:` classes are correct

### Issue: Layout breaks on mobile
**Solution:** Use `md:grid-cols-2` or `md:grid-cols-3` for responsive grid

### Issue: Callback not firing
**Solution:** Verify onClick is on the button element, not a child div

---

## Dependencies

### This Sprint Depends On:
- Sprint 1 complete (types.ts with RecommendationType)

### Other Sprints Depend On This:
- Sprint 9 (Main app flow uses these selectors)

---

## File Changes Summary

| File | Action | Lines |
|------|--------|-------|
| `src/components/CategorySelector.tsx` | Create | ~60 |
| `src/components/ModeSelector.tsx` | Create | ~80 |
| `src/lib/types.ts` | Update (if needed) | +1 |

---

## Next Steps

After completing Sprint 3:
1. Test both components in browser
2. Verify responsive behavior
3. Commit changes: `git add . && git commit -m "feat: add category and mode selectors"`
4. Move to Sprint 4: Dynamic Preference Form
5. Update progress in `docs/FILE-STATUS.md`

---

**Sprint 3 Complete When:** Both selector components work, are responsive, and properly call their callbacks.
