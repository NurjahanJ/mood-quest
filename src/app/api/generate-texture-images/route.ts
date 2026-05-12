import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { texture } = await request.json();

    if (!texture || typeof texture !== 'string') {
      return NextResponse.json(
        { error: 'texture string is required' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'No API key configured' },
        { status: 503 }
      );
    }

    const response = await openai.images.generate({
      model: 'gpt-image-2',
      prompt: `Abstract close-up texture photograph: "${texture}". Moody, atmospheric, soft lighting, no text, no words, no letters. Fine art photography style.`,
      size: '1024x1024',
      quality: 'low',
      output_format: 'webp',
    });

    const b64 = response.data?.[0]?.b64_json;
    if (b64) {
      return NextResponse.json({ image: `data:image/webp;base64,${b64}` });
    }

    return NextResponse.json({ image: null });
  } catch (error) {
    console.error(`Failed to generate image for texture:`, error);
    return NextResponse.json({ image: null });
  }
}
