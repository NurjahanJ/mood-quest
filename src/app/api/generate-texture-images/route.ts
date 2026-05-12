import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { textures } = await request.json();

    if (!textures || !Array.isArray(textures) || textures.length === 0) {
      return NextResponse.json(
        { error: 'textures array is required' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'No API key configured' },
        { status: 503 }
      );
    }

    // Generate images for each texture in parallel
    const imagePromises = textures.slice(0, 4).map(async (texture: string) => {
      try {
        const response = await openai.images.generate({
          model: 'gpt-image-2',
          prompt: `Abstract close-up texture photograph: "${texture}". Moody, atmospheric, soft lighting, no text, no words, no letters. Fine art photography style.`,
          size: '1024x1024',
          quality: 'medium',
        });

        return response.data?.[0]?.url || null;
      } catch (err) {
        console.error(`Failed to generate image for texture "${texture}":`, err);
        return null;
      }
    });

    const images = await Promise.all(imagePromises);

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error in generate-texture-images:', error);
    return NextResponse.json(
      { error: 'Failed to generate texture images' },
      { status: 500 }
    );
  }
}
