# MoodQuest - Project Overview

## What We're Building

MoodQuest is an AI-powered recommendation app that helps users find either a **game** or a **movie** based on their current mood, available time, platform, genre preference, play/watch style, and things they want to avoid.

This is a **portfolio-quality AI Product Engineer project** that demonstrates:
- AI-powered personalization
- Structured user input → structured AI output
- Recommendation logic with fallback systems
- Explainable recommendations
- User feedback loop
- Automated testing
- Clean, product-focused UX

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **AI:** OpenAI API (GPT-4o-mini)
- **Testing:** Vitest
- **Storage:** localStorage (for user feedback and history)

---

## Core Features

### 1. Dual Recommendation System
- Users choose between **Games** or **Movies**
- Each category has tailored input fields
- AI generates 3 personalized recommendations

### 2. Recommendation Modes
- **Quick Match:** Fast, practical recommendations
- **Deep Match:** Detailed reasoning and stronger personalization
- **Surprise Me:** Unexpected picks that still match preferences

### 3. User Feedback Loop
- Like/Dislike recommendations
- Save favorites
- Refine recommendations based on feedback
- View recommendation history

### 4. Taste Profile
- AI-generated summary of user preferences
- Shows primary mood, preferred experience, avoid patterns

### 5. Comparison Feature
- Compare two recommendations side-by-side
- See detailed score breakdowns

### 6. Fallback System
- Local recommendation engine when AI is unavailable
- Uses scoring algorithm on curated datasets
- Ensures app always works

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Main application flow
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Global styles
│   └── api/
│       ├── recommend/
│       │   └── route.ts            # AI recommendation endpoint
│       └── refine/
│           └── route.ts            # Refinement endpoint
│
├── components/
│   ├── CategorySelector.tsx        # Game vs Movie selection
│   ├── ModeSelector.tsx            # Quick/Deep/Surprise selection
│   ├── PreferenceForm.tsx          # Dynamic preference form
│   ├── RecommendationCard.tsx      # Individual recommendation display
│   ├── ResultsSection.tsx          # Results container
│   ├── TasteProfile.tsx            # User taste profile display
│   ├── RecommendationHistory.tsx   # Past recommendations
│   ├── GameComparison.tsx          # Game comparison view
│   └── MovieComparison.tsx         # Movie comparison view
│
├── lib/
│   ├── types.ts                    # TypeScript type definitions
│   ├── validation.ts               # Input validation logic
│   ├── gameDataset.ts              # 20+ curated games
│   ├── movieDataset.ts             # 20+ curated movies
│   ├── scoring.ts                  # Local scoring algorithm
│   ├── fallbackRecommendations.ts  # Fallback recommendation engine
│   └── storage.ts                  # localStorage utilities
│
└── tests/
    ├── validation.test.ts
    ├── scoring.test.ts
    ├── fallbackRecommendations.test.ts
    └── storage.test.ts
```

---

## Development Approach

### Sprint-Based Development
The project is divided into **11 sprints**, each with clear goals and deliverables:

1. **Sprint 1:** Core Data Layer (types, datasets, scoring)
2. **Sprint 2:** Validation & Fallback System
3. **Sprint 3:** Selection Components (Category, Mode)
4. **Sprint 4:** Dynamic Preference Form
5. **Sprint 5:** Enhanced Recommendation Card
6. **Sprint 6:** Results & Profile Components
7. **Sprint 7:** Comparison Components
8. **Sprint 8:** API Routes (recommend, refine)
9. **Sprint 9:** Main Application Flow
10. **Sprint 10:** Testing
11. **Sprint 11:** Documentation & Polish

### Code Quality Standards
- **Comprehensive comments** in every file
- **Clear documentation** for all functions
- **Type safety** throughout
- **Minimum 80% test coverage** for lib/ folder
- **Responsive design** for all components
- **Professional UI/UX** - not childish, not overly playful

---

## User Flow

```
1. User lands on homepage
   ↓
2. Select category (Game or Movie)
   ↓
3. Select mode (Quick Match / Deep Match / Surprise Me)
   ↓
4. Fill out preference form
   - Mood, Time, Platform/Streaming, Genre, Avoid
   ↓
5. Submit → API call to /api/recommend
   ↓
6. View 3 recommendations + Taste Profile
   ↓
7. User can:
   - Like/Dislike/Save recommendations
   - Compare two recommendations
   - Refine recommendations (calls /api/refine)
   - View history
   ↓
8. Recommendations saved to history
```

---

## API Response Schema

### /api/recommend Response
```typescript
{
  tasteProfile: {
    summary: "You enjoy cozy, low-pressure games...",
    primaryMood: "Relaxing",
    preferredExperience: "Solo gaming with flexible sessions",
    avoidPattern: "Avoids horror and grinding"
  },
  recommendations: [
    {
      id: "stardew-valley",
      category: "game",
      title: "Stardew Valley",
      whyItFits: "Perfect match for your relaxing mood...",
      moodMatch: "Directly matches your relaxing mood",
      timeFit: "Perfect for flexible sessions",
      platformFit: "PC",
      playStyleFit: "Solo",
      genreFit: "Simulation, RPG",
      similarTitles: ["Animal Crossing", "Spiritfarer"],
      confidence: 92,
      scores: {
        mood: 100,
        time: 90,
        platform: 100,
        genre: 85,
        overall: 92
      }
    }
    // ... 2 more recommendations
  ]
}
```

---

## Environment Variables

```env
OPENAI_API_KEY=your_openai_api_key_here
```

**IMPORTANT:** Never commit API keys to git. Use `.env.local` for development.

---

## Git Workflow

### Branch Strategy
- `main` - Production-ready code
- `feature/comprehensive-moodquest` - Current development branch

### Commit Strategy
- Commit after each sprint completion
- Use conventional commit format:
  - `feat: add category and mode selectors`
  - `fix: resolve validation error for movie preferences`
  - `test: add scoring algorithm tests`
  - `docs: update README with new features`

---

## Testing Strategy

### Unit Tests
- All utility functions in `lib/`
- Validation logic
- Scoring algorithm
- Storage utilities

### Integration Tests
- API routes
- Fallback system
- End-to-end recommendation flow

### Test Coverage Goals
- Minimum 80% coverage for `lib/` folder
- 100% coverage for critical paths (validation, scoring)

---

## Design Principles

### Visual Design
- **Professional dark theme** - black background, subtle grays
- **Clean typography** - clear hierarchy, readable
- **Minimal animations** - smooth transitions, no distractions
- **Responsive layout** - works on mobile, tablet, desktop
- **Accessible** - proper contrast, keyboard navigation

### UX Principles
- **Progressive disclosure** - show only what's needed
- **Clear feedback** - loading states, error messages
- **Forgiving** - validate but guide users
- **Fast** - optimize for performance
- **Reliable** - fallback systems ensure it always works

---

## Success Criteria

This project is successful when:

✅ Users can get game or movie recommendations in under 30 seconds  
✅ AI generates relevant, well-explained recommendations  
✅ Fallback system works when AI is unavailable  
✅ Users can refine recommendations based on feedback  
✅ All tests pass with >80% coverage  
✅ Code is well-documented and maintainable  
✅ UI is professional and portfolio-ready  
✅ README is comprehensive and clear  

---

## Future Enhancements

After core functionality is complete, consider:
- User accounts and authentication
- Larger recommendation databases
- Integration with real APIs (IGDB, TMDB)
- Streaming AI explanations
- Collaborative recommendations
- TV series recommendations
- Book recommendations
- Multi-media recommendation bundles

---

## Questions or Issues?

Refer to individual sprint files in `docs/` for detailed implementation guidance.

See `docs/FILE-STATUS.md` for which files to modify vs. create.
