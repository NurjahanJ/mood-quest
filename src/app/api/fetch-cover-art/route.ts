import { NextRequest, NextResponse } from 'next/server';

const RAWG_API_KEY = process.env.RAWG_API_KEY;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

async function fetchGameCover(title: string): Promise<string | null> {
  if (!RAWG_API_KEY) return null;

  try {
    const res = await fetch(
      `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&search=${encodeURIComponent(title)}&page_size=1`
    );
    if (!res.ok) return null;

    const data = await res.json();
    const game = data.results?.[0];
    return game?.background_image || null;
  } catch {
    return null;
  }
}

async function fetchMovieCover(title: string): Promise<string | null> {
  if (!TMDB_API_KEY) return null;

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}&page=1`
    );
    if (!res.ok) return null;

    const data = await res.json();
    const movie = data.results?.[0];

    // Prefer backdrop (landscape) over poster
    const imagePath = movie?.backdrop_path || movie?.poster_path;
    if (!imagePath) return null;

    return `https://image.tmdb.org/t/p/w1280${imagePath}`;
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, category } = await request.json();

    if (!title || !category) {
      return NextResponse.json(
        { error: 'title and category are required' },
        { status: 400 }
      );
    }

    let image: string | null = null;

    if (category === 'game') {
      image = await fetchGameCover(title);
    } else if (category === 'movie') {
      image = await fetchMovieCover(title);
    }

    return NextResponse.json({ image });
  } catch (error) {
    console.error('Failed to fetch cover art:', error);
    return NextResponse.json({ image: null });
  }
}
