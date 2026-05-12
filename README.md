# MoodQuest

**AI-Powered Mood Board Generator & Game/Movie Recommendation Engine**

MoodQuest is a dual-mode creative AI application that generates immersive mood boards for games and movies while also providing personalized recommendations based on mood, time, platform, and user preferences.

Built as an AI Product Engineering portfolio project, MoodQuest combines recommendation systems, multimodal AI generation, structured AI workflows, and cinematic UX design into a cohesive interactive experience.

---

# 🔗 Live Demo

https://moodquest-ai.netlify.app/

---

# 💻 GitHub Repository

https://github.com/NurjahanJ/moodquest

---

# 🎯 Why I Built This

This project was built to explore what modern AI-powered products can feel like beyond simple chatbot interactions.

Most recommendation systems focus primarily on utility:
- “What should I watch?”
- “What should I play?”

But entertainment discovery is often emotional and atmospheric rather than purely logical.

MoodQuest was designed to combine:
- recommendation systems
- emotional personalization
- multimodal AI generation
- immersive visual design
- explainable AI outputs

The goal was to create a product that feels cinematic, exploratory, and emotionally driven while also demonstrating real AI Product Engineering skills.

---

# 📋 Job Description Research

As part of this project, I researched real AI-focused engineering roles to better understand the skills, technologies, and workflows expected in modern AI product development.

The two primary roles I focused on were:

- AI Product Engineer
- AI Frontend Engineer

The goal of this research was to identify:
- which skills I already demonstrate
- which technologies appear repeatedly across job postings
- which areas I still need to strengthen
- how a portfolio project could help bridge those gaps

---

# 🎯 Target Role 1: AI Product Engineer

## Common Responsibilities

- Building AI-powered product features
- Integrating LLM APIs into user-facing applications
- Designing reliable AI workflows
- Developing recommendation and personalization systems
- Creating scalable frontend and backend architectures
- Collaborating across design, product, and engineering
- Improving user experience around AI systems
- Managing fallback states and AI reliability

## Frequently Requested Skills

- TypeScript
- React / Next.js
- API integration
- Prompt engineering
- Structured AI outputs
- Product thinking
- UX-focused engineering
- Testing and validation
- AI workflow design
- Personalization systems

## How MoodQuest Connects

MoodQuest demonstrates several skills commonly requested in AI Product Engineer roles:

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

---

# 🎯 Target Role 2: AI Frontend Engineer

## Common Responsibilities

- Building intuitive interfaces for AI systems
- Creating responsive frontend architectures
- Handling asynchronous AI workflows
- Managing AI loading states and streaming experiences
- Designing interfaces around AI-generated content
- Improving usability and interaction quality
- Building polished AI-powered user experiences

## Frequently Requested Skills

- React
- Next.js
- TypeScript
- Tailwind CSS
- State management
- API handling
- Async UI workflows
- Frontend architecture
- Performance optimization
- Responsive design

## How MoodQuest Connects

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

---

# 🧠 Skills Already Represented

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

---

# 📚 Skills Identified as Missing or Underrepresented

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

---

# ✨ Features

---

## 🎨 AI Mood Board Generator

Generate immersive mood boards for games and movies using AI.

### Includes:
- AI-generated atmosphere descriptions
- Core emotions and aesthetic themes
- Curated music playlists
- Similar media recommendations
- Poetic color palettes with hex codes
- Best time and setting for the experience
- AI-generated texture imagery using gpt-image-2
- Progressive image loading

### Example Outputs
- emotional themes
- cinematic atmosphere
- sensory textures
- visual tone
- cross-media inspiration

---

## 🎮 Recommendation System

Personalized game and movie recommendations based on:

- mood
- available time
- platform
- genre preferences
- play/watch style
- content to avoid

### Recommendation Modes
- Quick Match
- Deep Match
- Surprise Me

### Recommendation Features
- confidence scoring
- taste profiles
- recommendation refinement
- structured explanations
- comparison views
- recommendation history

---

## 🤖 Dual-Mode Landing Experience

Users can choose between:
- Mood Board Generator
- Recommendation System

The landing experience includes:
- conversational UI
- Lumi AI assistant
- smooth transitions between workflows

---

## ⚙️ Intelligent Fallback System

MoodQuest remains functional even when AI APIs fail.

Fallback systems include:
- local recommendation scoring
- curated fallback mood boards
- structured fallback outputs
- graceful degradation

This demonstrates reliability-focused product engineering.

---

# 🛠 Tech Stack

## Frontend
- Next.js 14 (App Router)
- React
- TypeScript
- Tailwind CSS

## AI Integration
- OpenAI GPT-4o-mini
- OpenAI gpt-image-2

## UI & Utilities
- Lucide React
- localStorage

## Testing
- Vitest

## Deployment
- Netlify

---

# 🏗 System Architecture

```txt
User Input
    ↓
Validation Layer
    ↓
GPT-4o-mini
    ↓
Structured JSON Response
    ↓
Mood Board / Recommendation Renderer
    ↓
gpt-image-2 Texture Generation
    ↓
Progressive UI Updates
```

---

# 📖 How It Works

---

## 🎨 Mood Board Flow

1. Choose “Mood Board” mode
2. Enter a game or movie title
3. GPT-4o-mini generates:
   - atmosphere
   - emotions
   - textures
   - playlists
   - colors
   - aesthetic tags
4. gpt-image-2 generates abstract texture imagery inspired by the board’s emotional and aesthetic themes
5. Images progressively load into the interface
6. Users explore and generate additional boards

---

## 🎮 Recommendation Flow

1. Choose “Recommendations”
2. Enter mood and preferences
3. AI generates:
   - 3 personalized recommendations
   - explanations
   - confidence scores
   - taste profile
4. Users can:
   - like
   - dislike
   - save
   - refine recommendations

---

# 🤖 AI Integration

MoodQuest uses multiple AI workflows.

---

## GPT-4o-mini

Used for:
- mood board generation
- recommendation generation
- structured JSON responses
- emotional analysis
- taste profiles

---

## gpt-image-2

Used for:
- abstract texture imagery
- aesthetic visualization
- sensory visual generation

Images are generated asynchronously and progressively rendered for smoother UX.

---

## Structured AI Outputs

One major focus was ensuring AI responses remained:
- deterministic
- render-safe
- structured
- UI-friendly

Implemented systems include:
- JSON schema enforcement
- validation layers
- structured prompts
- parsing recovery logic
- fallback handling

---

# ⚡ Key Engineering Challenges

---

## Structured AI Responses

Ensuring GPT consistently returned valid JSON required:
- schema enforcement
- validation systems
- parsing recovery
- prompt iteration

---

## Multimodal Coordination

Coordinating:
- recommendation generation
- mood board generation
- image synthesis
- progressive rendering

required careful asynchronous workflow management.

---

## Progressive Rendering

Mood board text loads first while images generate asynchronously afterward.

This improves:
- perceived performance
- responsiveness
- immersion

---

## AI Reliability

Fallback systems ensure the application remains functional even if:
- API requests fail
- JSON parsing fails
- image generation is unavailable

---

## Rate Limits & Performance

Image generation requests are staggered to:
- reduce API overload
- improve UX stability
- manage latency

---

# 📁 Project Structure

```txt
src/
├── app/
│   ├── api/
│   │   ├── generate-board/route.ts
│   │   ├── generate-texture-images/route.ts
│   │   └── recommend/route.ts
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── MoodBoardDisplay.tsx
│   ├── MoodBoardInput.tsx
│   ├── Lumi.tsx
│   ├── RecommendationForm.tsx
│   └── RecommendationResults.tsx
│
├── lib/
│   ├── types.ts
│   ├── validation.ts
│   ├── gameDataset.ts
│   ├── movieDataset.ts
│   ├── scoring.ts
│   └── fallbackRecommendations.ts
│
└── tests/
```

---

# 🧪 Testing

MoodQuest includes automated testing using Vitest.

## Tested Areas

### Recommendation System
- recommendation scoring
- fallback recommendation logic
- schema validation
- confidence score validation

### Mood Board System
- JSON structure validation
- palette generation
- playlist formatting
- texture prompt generation

### Validation
- required field validation
- malformed input handling
- fallback safety

---

# 🎨 Design Decisions

---

## Why Dark Theme?

The dark cinematic interface:
- reduces eye strain
- improves immersion
- enhances atmospheric visuals
- helps generated imagery stand out

---

## Why Multi-Step Flows?

The structured workflow:
- reduces cognitive load
- guides users naturally
- improves usability
- creates intentional pacing

---

## Why Progressive Rendering?

Text content loads immediately while images load afterward.

This:
- improves perceived performance
- prevents blank waiting states
- creates smoother interaction

---

## Why Fallback Systems?

AI products must remain functional even when external services fail.

Fallback systems demonstrate:
- graceful degradation
- reliability engineering
- user-focused resilience

---

# 📚 What I Learned

Building MoodQuest taught me that AI product development requires much more than simply integrating APIs.

Key takeaways included:
- designing structured AI workflows
- balancing creativity with reliability
- building graceful fallback systems
- managing asynchronous AI experiences
- improving UX around AI-generated content
- validating structured AI outputs safely

The project also deepened my understanding of how frontend architecture, product thinking, and AI integration work together in modern AI-powered applications.

---

# 🔮 Future Improvements

- Hero image generation for mood boards
- Saveable mood board galleries
- Exportable shareable boards
- User authentication
- Larger recommendation datasets
- Real-time AI streaming
- TMDB and IGDB integrations
- Collaborative recommendations
- Embedding-based similarity search
- Vector database integration

---

# 🌐 Deployment

- Frontend Hosting: Netlify
- AI APIs: OpenAI
- Environment Variables: .env.local

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/moodquest.git
cd moodquest
```

---

## Install Dependencies

```bash
npm install
```

---

## Create Environment Variables

Create `.env.local`

```env
OPENAI_API_KEY=your_api_key_here
```

---

## Run Development Server

```bash
npm run dev
```

Open:
http://localhost:3000

---

# 🧪 Run Tests

```bash
npm run test
```

Coverage:

```bash
npm run test:coverage
```

Watch mode:

```bash
npm run test:watch
```

---

# 👤 Author

Built by Nurjahan Jhorna as an AI Product Engineering portfolio project.

## Links

Portfolio:
https://nurjahanj.vercel.app/

GitHub:
https://github.com/NurjahanJ

---

# 🙏 Acknowledgments

- OpenAI
- Next.js
- Tailwind CSS
- Vitest
- Lucide React
