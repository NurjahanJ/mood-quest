import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { GenerateBoardRequest, GenerateBoardResponse, MoodBoard } from '@/lib/types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Fallback boards for when API key is missing
const FALLBACK_BOARDS: Record<string, MoodBoard> = {
  'the witcher 3': {
    title: 'The Witcher 3: Wild Hunt',
    category: 'game',
    tagline: 'Steel for humans, silver for monsters.',
    colorPalette: [
      { hex: '#2d4a3e', name: 'Velen Moss' },
      { hex: '#8b4513', name: 'Worn Leather' },
      { hex: '#c9a959', name: 'Gwent Gold' },
      { hex: '#4a0e0e', name: 'Crimson Blood' },
      { hex: '#1a1a2e', name: 'Midnight Curse' },
    ],
    aestheticTags: ['dark fantasy', 'slavic folklore', 'medieval grit', 'moral ambiguity', 'open world'],
    coreEmotions: ['melancholy', 'wonder', 'determination', 'loneliness', 'love'],
    atmosphere: 'A windswept world where beauty hides behind danger. Candlelit taverns contrast with monster-haunted bogs. Every choice carries weight.',
    soundtrackMood: 'Slavic folk instruments over brooding orchestral swells. Percussive combat themes giving way to haunting female vocals.',
    bestSetting: 'Late evening, rain on the window, headphones on, nothing else scheduled for hours.',
    textures: ['cracked leather', 'wet stone', 'rusted iron', 'ancient parchment', 'dense fog'],
    similarVibes: [
      { title: 'Pan\'s Labyrinth', category: 'movie' },
      { title: 'Dark Souls', category: 'game' },
      { title: 'The Name of the Wind', category: 'book' },
      { title: 'Heilung', category: 'music' },
    ],
  },
  'spirited away': {
    title: 'Spirited Away',
    category: 'movie',
    tagline: 'A world where spirits bathe and gods rest.',
    colorPalette: [
      { hex: '#5b8c85', name: 'Bathhouse Jade' },
      { hex: '#e8a87c', name: 'Lantern Glow' },
      { hex: '#2d1b4e', name: 'Spirit Dusk' },
      { hex: '#f4e4c1', name: 'Rice Paper' },
      { hex: '#c73e3e', name: 'Chihiro Red' },
    ],
    aestheticTags: ['japanese folklore', 'surrealism', 'coming of age', 'liminal spaces', 'studio ghibli'],
    coreEmotions: ['wonder', 'nostalgia', 'bravery', 'longing', 'gentle fear'],
    atmosphere: 'A dreamlike world that feels both alien and deeply familiar. Steam rises from enchanted waters. Every spirit has a story.',
    soundtrackMood: 'Joe Hisaishi piano themes — delicate, sweeping, bittersweet. Moments of playful whimsy dissolving into orchestral emotion.',
    bestSetting: 'A rainy afternoon, wrapped in a blanket, with tea. Let yourself feel small.',
    textures: ['warm steam', 'polished wood', 'flowing water', 'silk fabric', 'soft lamplight'],
    similarVibes: [
      { title: 'Howl\'s Moving Castle', category: 'movie' },
      { title: 'Journey', category: 'game' },
      { title: 'Mushishi', category: 'art' },
      { title: 'Nujabes', category: 'music' },
    ],
  },
};

function getFallbackBoard(title: string, category: 'game' | 'movie'): MoodBoard {
  const key = title.toLowerCase().trim();
  if (FALLBACK_BOARDS[key]) return FALLBACK_BOARDS[key];

  // Generic fallback
  return {
    title,
    category,
    tagline: category === 'game' ? 'Press start to feel something.' : 'Lights dim. Story begins.',
    colorPalette: [
      { hex: '#2a1f3a', name: 'Deep Night' },
      { hex: '#f5a35a', name: 'Warm Amber' },
      { hex: '#e87a8c', name: 'Soft Rose' },
      { hex: '#9bbf94', name: 'Quiet Sage' },
      { hex: '#1a1424', name: 'Velvet Dark' },
    ],
    aestheticTags: ['atmospheric', 'immersive', 'evocative', 'layered', 'memorable'],
    coreEmotions: ['curiosity', 'immersion', 'satisfaction', 'connection'],
    atmosphere: `The kind of ${category} that stays with you after it ends. A world you want to return to.`,
    soundtrackMood: 'A blend of ambient textures and emotional melodies that pull you deeper in.',
    bestSetting: 'Whenever you need to disappear into something for a while.',
    textures: ['soft glow', 'deep shadow', 'warm light', 'quiet stillness'],
    similarVibes: [
      { title: 'Firewatch', category: 'game' },
      { title: 'Moonlight', category: 'movie' },
      { title: 'Bon Iver', category: 'music' },
    ],
  };
}

export async function POST(request: NextRequest) {
  try {
    const { title, category }: GenerateBoardRequest = await request.json();

    if (!title || !category) {
      return NextResponse.json(
        { error: 'Title and category are required' },
        { status: 400 }
      );
    }

    // If no API key, use fallback
    if (!process.env.OPENAI_API_KEY) {
      const board = getFallbackBoard(title, category);
      return NextResponse.json({ board } as GenerateBoardResponse);
    }

    try {
      const systemPrompt = `You are a creative mood board designer. Given a ${category} title, generate a rich, evocative mood board that captures its essence.

RESPONSE FORMAT (strict JSON):
{
  "board": {
    "title": "Exact title of the ${category}",
    "category": "${category}",
    "tagline": "A short evocative tagline (max 10 words)",
    "colorPalette": [
      { "hex": "#hexcode", "name": "Poetic color name" }
    ],
    "aestheticTags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
    "coreEmotions": ["emotion1", "emotion2", "emotion3", "emotion4"],
    "atmosphere": "2-3 sentence atmospheric description",
    "soundtrackMood": "Description of the musical/audio vibe",
    "bestSetting": "When and where to best experience this",
    "textures": ["texture1", "texture2", "texture3", "texture4"],
    "similarVibes": [
      { "title": "Something with similar energy", "category": "game|movie|music|art|book" }
    ]
  }
}

RULES:
- colorPalette: exactly 5 colors that capture the visual identity. Use poetic names.
- aestheticTags: 5 tags describing the overall aesthetic
- coreEmotions: 4 primary emotions it evokes
- textures: 4 tactile/sensory descriptors
- similarVibes: 4 items from different categories (game, movie, music, art, or book)
- atmosphere: Be evocative and specific, not generic
- tagline: Short, punchy, memorable
- All hex codes must be valid 6-digit hex colors
- Be creative and specific to this exact ${category}`;

      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Generate a mood board for the ${category}: "${title}"` },
        ],
        temperature: 0.85,
        response_format: { type: 'json_object' },
      });

      const content = completion.choices[0]?.message?.content;
      if (!content) throw new Error('No response from OpenAI');

      const result: GenerateBoardResponse = JSON.parse(content);

      if (!result.board || !result.board.colorPalette) {
        throw new Error('Invalid response format');
      }

      return NextResponse.json(result);
    } catch (aiError) {
      console.error('AI error, using fallback:', aiError);
      const board = getFallbackBoard(title, category);
      return NextResponse.json({ board } as GenerateBoardResponse);
    }
  } catch (error) {
    console.error('Error in generate-board:', error);
    return NextResponse.json(
      { error: 'Failed to generate mood board' },
      { status: 500 }
    );
  }
}
