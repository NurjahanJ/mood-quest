# MoodQuest

**AI-Powered Game Recommendation Engine**

MoodQuest is a polished, portfolio-quality web application that recommends video games based on your current mood, available time, gaming platform, play style, and preferences. Built to demonstrate expertise in AI integration, product thinking, and full-stack development.

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

✨ **AI-Powered Recommendations**
- Uses OpenAI's GPT-4o-mini to generate personalized game suggestions
- Considers mood, time availability, platform, play style, and genre preferences
- Provides detailed explanations for why each game fits your criteria

🛡️ **Intelligent Fallback System**
- Local recommendation engine activates if AI API fails or is unavailable
- Ensures users always get quality recommendations
- Seamless experience regardless of backend status

🎨 **Polished UI/UX**
- Modern dark theme with gradient accents
- Responsive design that works on all devices
- Clear, professional copy and intuitive form design
- Loading states and error handling

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
│   │       └── route.ts          # API endpoint for recommendations
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main page
├── components/
│   ├── PreferenceForm.tsx        # User input form
│   ├── RecommendationCard.tsx    # Individual game card
│   └── ResultsSection.tsx        # Results display with states
├── lib/
│   ├── fallbackRecommendations.ts # Local recommendation engine
│   ├── types.ts                   # TypeScript type definitions
│   └── validation.ts              # Input validation logic
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

1. **User Input**: User fills out a structured form with their preferences
2. **Validation**: Input is validated before being sent to the API
3. **AI Request**: Preferences are sent to OpenAI with a carefully crafted system prompt
4. **Structured Output**: OpenAI returns JSON matching our exact schema
5. **Validation**: Response is validated to ensure it meets requirements
6. **Display**: Recommendations are displayed with detailed explanations

### System Prompt Design

The system prompt enforces:
- Exact JSON schema compliance
- Exactly 3 recommendations
- Confidence scores between 1-100
- Real, existing games only
- Thoughtful, specific explanations

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

The fallback system includes curated recommendations for:
- Relaxing
- Cozy
- Competitive
- Story-driven
- Strategic
- Chaotic

Each mood has 3 carefully selected games with detailed explanations.

---

## Future Improvements

**Enhanced AI Features**:
- Multi-turn conversations to refine recommendations
- User preference learning over time
- Integration with game databases (IGDB, Steam API)

**User Features**:
- Save favorite recommendations
- Share recommendations with friends
- Rate recommendations to improve future suggestions

**Technical Enhancements**:
- Redis caching for common queries
- A/B testing framework
- Analytics and user behavior tracking
- Progressive Web App (PWA) support

**Testing**:
- E2E tests with Playwright
- API integration tests
- Performance testing

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
