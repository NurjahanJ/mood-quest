# MoodQuest

**AI-Powered Mood Board Generator & Game/Movie Recommendation Engine**

MoodQuest is a dual-mode creative tool that generates rich, visual mood boards for games and movies using AI, and provides personalized recommendations based on your mood, time, and preferences. Built to demonstrate AI Product Engineering skills.

---

## 🎯 Why I Built This

This project showcases skills essential for an AI Product Engineer role:

- **AI Integration:** OpenAI API with structured JSON outputs and image generation
- **Multimodal AI:** Text generation (GPT-4o-mini) + image generation (gpt-image-2)
- **Product Thinking:** User-centric design with clear value proposition
- **System Design:** Fallback logic ensures reliability
- **Full-Stack Development:** Next.js, TypeScript, API routes
- **Testing:** Comprehensive test coverage with Vitest
- **Code Quality:** Well-documented, maintainable code

---

## 📋 Job Description Research

As part of this project, I researched real AI-focused engineering roles to better understand the skills, technologies, and workflows expected in modern AI product development.

The two primary roles I focused on were:

- AI Product Engineer
- AI Frontend Engineer

The goal of this research was to identify:
- which skills I already demonstrate
- which technologies appear repeatedly across job postings
- which areas I still need to strengthen
- how a portfolio project could help bridge those gaps

### Target Role 1: AI Product Engineer

**Common Responsibilities:**

- Building AI-powered product features
- Integrating LLM APIs into user-facing applications
- Designing reliable AI workflows
- Developing recommendation and personalization systems
- Creating scalable frontend and backend architectures
- Collaborating across design, product, and engineering
- Improving user experience around AI systems
- Managing fallback states and AI reliability

**Frequently Requested Skills:**

TypeScript, React/Next.js, API integration, prompt engineering, structured AI outputs, product thinking, UX-focused engineering, testing and validation, AI workflow design, data handling and personalization systems

**How MoodQuest Connects:**

MoodQuest directly demonstrates several skills commonly requested in AI Product Engineer roles:

- AI-powered recommendation workflows
- OpenAI API integration
- Structured JSON AI outputs
- Multimodal AI generation (text + images)
- Recommendation system design
- User-centered product thinking
- Fallback recommendation logic
- Progressive rendering and UX optimization
- Automated testing with Vitest
- Full-stack application architecture

### Target Role 2: AI Frontend Engineer

**Common Responsibilities:**

- Building intuitive interfaces for AI systems
- Creating responsive frontend architectures
- Handling asynchronous AI workflows
- Managing AI loading states and streaming experiences
- Designing interfaces around AI-generated content
- Improving usability and interaction quality
- Building polished AI-powered user experiences

**Frequently Requested Skills:**

React, Next.js, TypeScript, Tailwind CSS, state management, API handling, async UI workflows, frontend architecture, performance optimization, responsive design

**How MoodQuest Connects:**

MoodQuest demonstrates many frontend engineering concepts related to AI systems:

- Dynamic recommendation interfaces
- Responsive UI architecture
- Progressive image loading
- Asynchronous AI workflows
- Real-time loading states
- Structured rendering from AI-generated data
- Interactive feedback systems
- Multi-step user flows
- Recommendation comparison interfaces
- Modern frontend component architecture

### Skills Already Represented

Through building MoodQuest, I demonstrated experience with:

- Next.js App Router
- TypeScript
- Tailwind CSS
- OpenAI API integration
- Recommendation systems
- Structured AI output handling
- Prompt engineering
- Multimodal AI workflows
- Frontend architecture
- User-centered design
- Automated testing
- Fallback systems and graceful degradation

### Skills Identified as Missing or Underrepresented

After reviewing job descriptions, I identified several areas I still want to improve:

- Authentication systems
- Database integration
- Vector databases and embeddings
- Retrieval-Augmented Generation (RAG)
- Real-time AI streaming
- Cloud infrastructure
- Analytics and monitoring
- Scalable backend systems
- AI observability and evaluation

### Why MoodQuest Was Chosen

MoodQuest was intentionally designed to help bridge the gap between my current skills and the expectations of modern AI-focused engineering roles.

The project allowed me to explore:

- AI product workflows
- multimodal AI integration
- recommendation system design
- frontend architecture for AI systems
- structured AI outputs
- reliability through fallback systems
- testing and validation
- user-focused AI experiences

Rather than building a generic chatbot, I wanted to create a more complete AI product experience that combined practical functionality with immersive and interactive design.

---

## ✨ Features

### Mood Board Generator
- **AI-generated mood boards** for any game or movie title
- **Color palette** with 5 poetic named colors and hex codes
- **Core emotions** and **aesthetic tags** capturing the title's essence
- **Atmospheric description** — evocative 2-3 sentence scene-setting
- **Curated music playlist** — 5 real tracks with artist names
- **AI-generated texture images** — abstract photography via gpt-image-2 for each sensory texture
- **Best setting** — when and where to experience it
- **Similar vibes** — cross-media recommendations (games, movies, music, art, books)
- **Progressive image loading** — board text appears instantly, images fade in as they generate

### Recommendation System
- **Games:** Platform-specific recommendations (PC, consoles, mobile)
- **Movies:** Streaming platform recommendations (Netflix, Disney+, etc.)
- **3 Modes:** Quick Match, Deep Match, Surprise Me
- Generates taste profiles from preferences
- Explains why each recommendation fits
- Provides confidence scores and breakdowns

### Dual-Mode Landing Page
- Choose between Mood Board Generator or Recommendation System
- Conversational UI with Lumi assistant character
- Seamless switching between modes

### Intelligent Fallback System
- Local scoring algorithm when AI unavailable
- Curated fallback mood boards for popular titles
- 20+ curated games and movies for recommendations
- Maintains same quality and format

### Professional UI/UX
- Warm dark theme with custom color system
- Responsive layout (mobile, tablet, desktop)
- Loading states and error handling
- Smooth transitions and progressive rendering

---

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **AI Text:** OpenAI GPT-4o-mini (mood boards + recommendations)
- **AI Images:** OpenAI gpt-image-2 (texture photography)
- **Icons:** Lucide React
- **Testing:** Vitest
- **Hosting:** Netlify

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

### Mood Board Flow

1. **Choose Mode:** Select "Mood Board" from the landing page
2. **Enter Title:** Type a game or movie name and select the category
3. **AI Generates Board:** GPT-4o-mini creates a structured mood board (colors, emotions, atmosphere, playlist, textures, vibes)
4. **Texture Images Load:** gpt-image-2 generates abstract photography for each texture, appearing progressively
5. **Explore & Reset:** Browse the board, then create another

### Recommendation Flow

1. **Choose Mode:** Select "Recommendations" from the landing page
2. **Fill Preferences:** Mood, time, platform, genre, etc.
3. **Get Recommendations:** AI generates 3 personalized picks with explanations

### AI Integration

The app uses two OpenAI models:
- **GPT-4o-mini:** Structured JSON generation for mood boards and recommendations
- **gpt-image-2:** Abstract texture photography (4 images per board, staggered to respect rate limits)
- **Fallback system** with curated boards and local scoring when AI is unavailable

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── generate-board/route.ts        # Mood board generation (GPT-4o-mini)
│   │   ├── generate-texture-images/route.ts # Texture image generation (gpt-image-2)
│   │   └── recommend/route.ts             # Recommendation endpoint
│   ├── page.tsx                           # Dual-mode landing page
│   ├── layout.tsx                         # Root layout
│   └── globals.css                        # Global styles + custom colors
├── components/
│   ├── MoodBoardDisplay.tsx               # Visual mood board renderer
│   ├── MoodBoardInput.tsx                 # Title + category input
│   ├── Lumi.tsx                           # AI assistant character
│   ├── RecommendationForm.tsx             # Preference input form
│   └── RecommendationResults.tsx          # Recommendation cards
├── lib/
│   ├── types.ts                           # TypeScript types (MoodBoard, Recommendations)
│   ├── validation.ts                      # Input validation
│   ├── gameDataset.ts                     # Curated game database
│   ├── movieDataset.ts                    # Curated movie database
│   ├── scoring.ts                         # Local scoring algorithm
│   └── fallbackRecommendations.ts         # Fallback recommendation engine
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

- [ ] Hero/cover image generation for each mood board
- [ ] Save mood boards to a browsable gallery
- [ ] Export mood boards as shareable images
- [ ] Board collections and filtering
- [ ] User accounts and authentication
- [ ] Larger recommendation databases
- [ ] Integration with IGDB and TMDB APIs
- [ ] Real-time AI streaming

---

## 📝 License

MIT License - feel free to use this project for learning

---

## 👤 Author

Built by Nurjahan Jhorna as a portfolio project

- Portfolio: [your-portfolio.com](https://nurjahanj.vercel.app/)
- GitHub: [@yourusername](https://github.com/Nurjahan)

---

## 🙏 Acknowledgments

- OpenAI for the API
- Next.js team for the framework
- Tailwind CSS for styling utilities
- Vitest for testing framework
