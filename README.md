# MoodQuest

**AI-Powered Game & Movie Recommendation Engine**

MoodQuest is a polished, portfolio-quality web application that recommends both video games and movies based on your current mood, available time, platform, and preferences. Built to demonstrate expertise in AI integration, product thinking, and full-stack development with a beautiful, modern UI.

---

## Why This Was Built

This project showcases skills essential for an **AI Product Engineer** role:

- **AI-Powered Recommendations**: Integration with OpenAI's API to generate personalized, context-aware game suggestions
- **Structured Input → Structured Output**: Enforced JSON schemas for reliable AI responses
- **Product Thinking**: Clean UX, thoughtful copy, and user-centric design
- **System Reliability**: Robust fallback logic ensures the app works even when AI services are unavailable
- **Testing**: Automated tests for critical business logic
- **Modern Stack**: Next.js, TypeScript, and Tailwind CSS for production-ready code

This isn't a toy project—it's designed to feel like a real product you'd ship to users.

---

## Features

✨ **Dual Recommendation System**
- **Games**: Personalized game recommendations based on platform, play style, and mood
- **Movies**: Curated movie suggestions based on streaming platform and preferences
- Seamless tab switching between games and movies
- Uses OpenAI's GPT-4o-mini for intelligent, context-aware suggestions

🎨 **Beautiful, Modern UI**
- Animated gradient backgrounds and smooth transitions
- Interactive mood selection with emojis
- Enhanced recommendation cards with color-coded confidence scores
- Responsive design that works perfectly on all devices
- Dark theme with purple/pink gradient accents
- Hover effects and micro-interactions for better UX

🛡️ **Intelligent Fallback System**
- Separate fallback engines for games and movies
- 18 curated game recommendations across 6 moods
- 18 hand-picked movie recommendations across 6 moods
- Ensures users always get quality recommendations
- Seamless experience regardless of backend status

🧠 **Smart Preference Handling**
- Conditional form fields based on recommendation type
- Platform selection for games (PC, consoles, mobile)
- Streaming platform selection for movies (Netflix, Disney+, etc.)
- Genre preferences for both games and movies
- Custom "avoid" filters for personalized results

🧪 **Comprehensive Testing**
- Vitest for unit testing
- Tests for validation logic and fallback recommendations
- Ensures reliability and code quality

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: OpenAI API (GPT-4o-mini)
- **Testing**: Vitest
- **Type Safety**: Full TypeScript coverage with strict mode

---

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── recommend/
│   │       └── route.ts                    # API endpoint for games & movies
│   ├── globals.css                         # Global styles with animations
│   ├── layout.tsx                          # Root layout
│   └── page.tsx                            # Main page with enhanced UI
├── components/
│   ├── EnhancedPreferenceForm.tsx          # Dual-mode form with tabs
│   ├── EnhancedRecommendationCard.tsx      # Enhanced cards for games/movies
│   ├── PreferenceForm.tsx                  # Legacy form (games only)
│   ├── RecommendationCard.tsx              # Legacy card (games only)
│   └── ResultsSection.tsx                  # Legacy results section
├── lib/
│   ├── fallbackRecommendations.ts          # Game fallback engine
│   ├── fallbackMovieRecommendations.ts     # Movie fallback engine
│   ├── types.ts                            # TypeScript type definitions
│   └── validation.ts                       # Input validation logic
└── tests/
    ├── fallbackRecommendations.test.ts
    └── validation.test.ts
```

---

## How to Run Locally

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- OpenAI API key (optional—app works without it using fallback)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mood-quest
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```
   
   **Note**: The app will work without an API key by using the fallback recommendation system.

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## How to Run Tests

Run all tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm test -- --watch
```

Run tests with UI:
```bash
npm run test:ui
```

---

## AI Integration Explanation

### How It Works

1. **User Input**: User selects recommendation type (games/movies) and fills preferences
2. **Validation**: Input is validated with type-specific requirements
3. **Dynamic Prompts**: System generates appropriate prompts based on type
4. **AI Request**: Preferences sent to OpenAI with tailored system prompt
5. **Structured Output**: OpenAI returns JSON matching the exact schema
6. **Validation**: Response validated to ensure it meets requirements
7. **Display**: Recommendations shown with enhanced visual cards

### System Prompt Design

The system prompt dynamically adjusts based on recommendation type and enforces:
- Exact JSON schema compliance (different for games vs movies)
- Exactly 3 recommendations
- Confidence scores between 1-100
- Real, existing games/movies only
- Thoughtful, specific explanations
- Platform-specific availability information

### Response Format

```json
{
  "recommendations": [
    {
      "title": "Game Title",
      "whyItFits": "Explanation of why this game matches preferences",
      "moodMatch": "How it matches the mood",
      "timeFit": "How it fits the time available",
      "platformFit": "Platform availability",
      "similarGames": ["Game 1", "Game 2", "Game 3"],
      "confidence": 95
    }
  ]
}
```

---

## Fallback Logic Explanation

### Why Fallback Matters

In production systems, external APIs can fail. MoodQuest ensures users always get recommendations through a local fallback system.

### How It Works

1. **Trigger Conditions**:
   - OpenAI API key not configured
   - API request fails
   - Response doesn't match expected schema

2. **Fallback Engine**:
   - Curated recommendations mapped to each mood type
   - High-quality, hand-picked games
   - Same output format as AI responses
   - Confidence scores adjusted based on preference matching

3. **User Experience**:
   - Seamless—users don't know fallback was used
   - No error messages for API failures
   - Consistent quality of recommendations

### Fallback Coverage

The fallback system includes curated recommendations for both games and movies:

**Games** (18 total):
- Relaxing: Stardew Valley, Journey, Unpacking
- Cozy: Animal Crossing, Spiritfarer, A Short Hike
- Competitive: Rocket League, Smash Bros, StarCraft II
- Story-driven: The Last of Us, Disco Elysium, What Remains of Edith Finch
- Strategic: Civilization VI, Into the Breach, Factorio
- Chaotic: Overcooked 2, DOOM Eternal, Risk of Rain 2

**Movies** (18 total):
- Relaxing: My Neighbor Totoro, Chef, Amélie
- Cozy: The Grand Budapest Hotel, Little Women, Paddington 2
- Competitive: Rush, Moneyball, Whiplash
- Story-driven: The Shawshank Redemption, Arrival, Parasite
- Strategic: The Prestige, Ocean's Eleven, The Imitation Game
- Chaotic: Everything Everywhere All at Once, Mad Max: Fury Road, Scott Pilgrim

Each recommendation includes detailed explanations, mood matching, time fit analysis, and similar titles.

---

## Future Improvements

**Enhanced AI Features**:
- Multi-turn conversations to refine recommendations
- User preference learning over time
- Integration with external APIs (IGDB, TMDB, Steam)
- Hybrid recommendations (game + movie combos)

**User Features**:
- Save favorite recommendations to profile
- Share recommendations with friends via link
- Rate recommendations to improve future suggestions
- Recommendation history and tracking
- "Watch/Play later" lists

**New Content Types**:
- TV series recommendations
- Book recommendations
- Music/podcast recommendations
- Multi-media recommendation bundles

**Technical Enhancements**:
- Redis caching for common queries
- A/B testing framework
- Analytics and user behavior tracking
- Progressive Web App (PWA) support
- User authentication and profiles

**Testing**:
- E2E tests with Playwright
- API integration tests
- Performance testing
- Visual regression testing

---

## Development Notes

### Code Quality

- **TypeScript**: Full type safety with strict mode enabled
- **ESLint**: Configured for Next.js best practices
- **Component Design**: Reusable, single-responsibility components
- **Error Handling**: Comprehensive error states and user feedback

### Performance

- **Server Components**: Used where possible for better performance
- **Client Components**: Only where interactivity is needed
- **API Routes**: Efficient with proper error handling
- **Optimized Builds**: Production builds are optimized by Next.js

### Accessibility

- Semantic HTML
- Proper form labels
- Keyboard navigation support
- Clear error messages

---

## License

MIT License - feel free to use this project as a portfolio piece or learning resource.

---

## Contact

Built as a portfolio project to demonstrate AI Product Engineer capabilities.

**Key Demonstrations**:
- ✅ AI API integration with structured outputs
- ✅ Product thinking and UX design
- ✅ System reliability with fallback logic
- ✅ Modern web development stack
- ✅ Testing and code quality
- ✅ Production-ready code

---

**MoodQuest** - Find your next game based on your mood.
