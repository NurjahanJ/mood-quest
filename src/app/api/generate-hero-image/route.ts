import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { title, category, atmosphere, aestheticTags } = await request.json();

    if (!title || !category) {
      return NextResponse.json(
        { error: 'title and category are required' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'No API key configured' },
        { status: 503 }
      );
    }

    const tags = Array.isArray(aestheticTags) ? aestheticTags.join(', ') : '';
    const prompt = `Cinematic wide landscape artwork capturing the mood of "${title}" (${category}). ${atmosphere || ''} Style: ${tags}. Atmospheric, evocative, no text, no words, no letters, no UI elements. Digital art, painterly.`;

    const response = await openai.images.generate({
      model: 'gpt-image-2',
      prompt,
      size: '1536x1024',
      quality: 'low',
      output_format: 'webp',
    });

    const b64 = response.data?.[0]?.b64_json;
    if (b64) {
      return NextResponse.json({ image: `data:image/webp;base64,${b64}` });
    }

    return NextResponse.json({ image: null });
  } catch (error) {
    console.error('Failed to generate hero image:', error);
    return NextResponse.json({ image: null });
  }
}
