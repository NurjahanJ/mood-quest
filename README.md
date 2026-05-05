# MoodQuest

**AI-Powered Game & Movie Recommendation Engine**

MoodQuest is a portfolio-quality web application that recommends games and movies based on your current mood, available time, platform, and preferences. Built to demonstrate AI Product Engineering skills.

---

## 🎯 Why I Built This

This project showcases skills essential for an AI Product Engineer role:

- **AI Integration:** OpenAI API with structured JSON outputs
- **Product Thinking:** User-centric design with clear value proposition
- **System Design:** Fallback logic ensures reliability
- **Full-Stack Development:** Next.js, TypeScript, API routes
- **Testing:** Comprehensive test coverage with Vitest
- **Code Quality:** Well-documented, maintainable code

---

## ✨ Features

### Dual Recommendation System
- **Games:** Platform-specific recommendations (PC, consoles, mobile)
- **Movies:** Streaming platform recommendations (Netflix, Disney+, etc.)
- **3 Modes:** Quick Match, Deep Match, Surprise Me

### AI-Powered Personalization
- Generates taste profiles from preferences
- Explains why each recommendation fits
- Provides confidence scores and breakdowns

### User Feedback Loop
- Like/Dislike recommendations
- Save favorites
- Refine recommendations based on feedback
- View recommendation history

### Intelligent Fallback System
- Local scoring algorithm when AI unavailable
- 20+ curated games and movies
- Maintains same quality and format

### Professional UI/UX
- Clean, dark theme design
- Responsive layout (mobile, tablet, desktop)
- Loading states and error handling
- Smooth transitions

---

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **AI:** OpenAI API (GPT-4o-mini)
- **Testing:** Vitest
- **Storage:** localStorage

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/mood-quest.git
cd mood-quest
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Add your OpenAI API key to `.env.local`:
```
OPENAI_API_KEY=your_api_key_here
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

---

## 🧪 Testing

Run tests:
```bash
npm run test
```

Run tests with coverage:
```bash
npm run test:coverage
```

Run tests in watch mode:
```bash
npm run test:watch
```

---

## 📖 How It Works

### User Flow

1. **Select Category:** Choose between games or movies
2. **Select Mode:** Quick Match, Deep Match, or Surprise Me
3. **Fill Preferences:** Mood, time, platform, genre, etc.
4. **Get Recommendations:** AI generates 3 personalized picks
5. **Provide Feedback:** Like, dislike, or save recommendations
6. **Refine (Optional):** Get improved recommendations based on feedback

### AI Integration

The app uses OpenAI's GPT-4o-mini with:
- **Structured prompts** that enforce JSON output
- **Dynamic system prompts** based on category and mode
- **Strict validation** of AI responses
- **Fallback system** when AI is unavailable

### Recommendation Logic

**AI Mode (Primary):**
- Analyzes user preferences
- Generates taste profile
- Returns 3 recommendations with explanations
- Includes confidence scores

**Fallback Mode (When AI Unavailable):**
- Uses local scoring algorithm
- Ranks items based on:
  - Mood match (weighted by mode)
  - Time compatibility
  - Platform availability
  - Genre preference
  - Avoid tag penalties
- Returns top 3 with generated explanations

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── recommend/route.ts    # Main recommendation endpoint
│   │   └── refine/route.ts       # Refinement endpoint
│   ├── page.tsx                  # Main application
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── components/
│   ├── CategorySelector.tsx      # Game vs Movie selection
│   ├── ModeSelector.tsx          # Mode selection
│   ├── PreferenceForm.tsx        # Dynamic preference form
│   ├── RecommendationCard.tsx    # Individual recommendation
│   ├── ResultsSection.tsx        # Results container
│   ├── TasteProfile.tsx          # Taste profile display
│   ├── RecommendationHistory.tsx # History display
│   ├── GameComparison.tsx        # Game comparison
│   └── MovieComparison.tsx       # Movie comparison
├── lib/
│   ├── types.ts                  # TypeScript types
│   ├── validation.ts             # Input validation
│   ├── gameDataset.ts            # Game database
│   ├── movieDataset.ts           # Movie database
│   ├── scoring.ts                # Scoring algorithm
│   ├── fallbackRecommendations.ts # Fallback system
│   └── storage.ts                # localStorage utilities
└── tests/
    ├── scoring.test.ts
    ├── fallbackRecommendations.test.ts
    ├── validation.test.ts
    └── storage.test.ts
```

---

## 🎨 Design Decisions

### Why Dark Theme?
Professional, reduces eye strain, highlights content

### Why Multi-Step Flow?
Reduces cognitive load, guides users, feels intentional

### Why Fallback System?
Ensures reliability, demonstrates system thinking, works offline

### Why localStorage?
Simple, no auth needed, fast, works offline

---

## 🔮 Future Improvements

- [ ] User accounts and authentication
- [ ] Larger recommendation databases
- [ ] Integration with IGDB and TMDB APIs
- [ ] TV series recommendations
- [ ] Book recommendations
- [ ] Collaborative filtering
- [ ] Social sharing features
- [ ] Mobile app (React Native)

---

## 📝 License

MIT License - feel free to use this project for learning

---

## 👤 Author

Built by [Your Name] as a portfolio project

- Portfolio: [your-portfolio.com](https://your-portfolio.com)
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourname)

---

## 🙏 Acknowledgments

- OpenAI for the API
- Next.js team for the framework
- Tailwind CSS for styling utilities
- Vitest for testing framework
