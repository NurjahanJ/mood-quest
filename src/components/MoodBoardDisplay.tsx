'use client';

import { useState, useEffect } from 'react';
import { MoodBoard } from '@/lib/types';
import { Palette, Heart, Cloud, Music, MapPin, Layers, Compass } from 'lucide-react';

interface MoodBoardDisplayProps {
  board: MoodBoard;
  onReset: () => void;
}

export default function MoodBoardDisplay({ board, onReset }: MoodBoardDisplayProps) {
  const [heroImage, setHeroImage] = useState<string | null>(board.heroImage || null);
  const [heroLoading, setHeroLoading] = useState(false);
  const [textureImages, setTextureImages] = useState<(string | null)[]>([]);
  const [imagesLoading, setImagesLoading] = useState<boolean[]>([]);
  const [vibeImages, setVibeImages] = useState<Record<string, string | null>>({});
  const [vibeImagesLoading, setVibeImagesLoading] = useState<Record<string, boolean>>({});

  // Fetch official cover art
  useEffect(() => {
    if (board.heroImage) { setHeroImage(board.heroImage); return; }

    let cancelled = false;
    setHeroLoading(true);

    fetch('/api/fetch-cover-art', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: board.title,
        category: board.category,
      }),
    })
      .then((res) => res.json())
      .then((data) => { if (!cancelled && data.image) setHeroImage(data.image); })
      .catch(() => {})
      .finally(() => { if (!cancelled) setHeroLoading(false); });

    return () => { cancelled = true; };
  }, [board.title, board.category, board.heroImage]);

  // Fetch cover art for Similar Vibes (games + movies only)
  useEffect(() => {
    if (!board.similarVibes || board.similarVibes.length === 0) return;

    board.similarVibes.forEach((vibe) => {
      if (vibe.category !== 'game' && vibe.category !== 'movie') return;
      const key = `${vibe.category}-${vibe.title}`;
      if (vibeImages[key] !== undefined) return;

      setVibeImagesLoading((prev) => ({ ...prev, [key]: true }));

      fetch('/api/fetch-cover-art', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: vibe.title, category: vibe.category }),
      })
        .then((res) => res.json())
        .then((data) => {
          setVibeImages((prev) => ({ ...prev, [key]: data.image || null }));
        })
        .catch(() => {
          setVibeImages((prev) => ({ ...prev, [key]: null }));
        })
        .finally(() => {
          setVibeImagesLoading((prev) => ({ ...prev, [key]: false }));
        });
    });
  }, [board.similarVibes]);

  // Fetch texture images
  useEffect(() => {
    if (!board.textures || board.textures.length === 0) return;
    if (board.textureImages && board.textureImages.length > 0) {
      setTextureImages(board.textureImages);
      return;
    }

    let cancelled = false;
    const count = Math.min(board.textures.length, 4);
    setTextureImages(new Array(count).fill(null));
    setImagesLoading(new Array(count).fill(true));

    const fetchTexture = (texture: string, i: number) => {
      fetch('/api/generate-texture-images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texture }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (!cancelled && data.image) {
            setTextureImages((prev) => {
              const next = [...prev];
              next[i] = data.image;
              return next;
            });
          }
        })
        .catch(() => {})
        .finally(() => {
          if (!cancelled) {
            setImagesLoading((prev) => {
              const next = [...prev];
              next[i] = false;
              return next;
            });
          }
        });
    };

    // Stagger requests to stay within rate limits (5 images/min)
    board.textures.slice(0, 4).forEach((texture, i) => {
      setTimeout(() => {
        if (!cancelled) fetchTexture(texture, i);
      }, i * 15000);
    });

    return () => { cancelled = true; };
  }, [board.textures, board.textureImages]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Hero Image */}
      <div className="w-full aspect-[3/2] rounded-3xl overflow-hidden bg-night-900 border border-night-700 relative">
        {heroImage ? (
          <img
            src={heroImage}
            alt={board.title}
            className="w-full h-full object-cover transition-opacity duration-700"
          />
        ) : heroLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-cream-400/30 border-t-cream-400 rounded-full animate-spin" />
          </div>
        ) : (
          <div
            className="w-full h-full"
            style={{
              background: board.colorPalette.length > 0
                ? `linear-gradient(135deg, ${board.colorPalette.map((c) => c.hex).join(', ')})`
                : undefined,
            }}
          />
        )}
        {/* Overlay title on hero */}
        <div className="absolute inset-0 bg-gradient-to-t from-night-950/80 via-transparent to-transparent flex flex-col justify-end p-6 md:p-8">
          <p className="text-cream-400 text-sm uppercase tracking-wider mb-1">
            {board.category === 'game' ? '🎮 Game' : '🎬 Movie'} Mood Board
          </p>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-cream-50">
            {board.title}
          </h2>
          <p className="text-lg text-cream-300 font-serif italic mt-1">
            &ldquo;{board.tagline}&rdquo;
          </p>
        </div>
      </div>

      {/* Color Palette */}
      <section className="bg-night-900 rounded-3xl border border-night-700 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Palette className="w-4 h-4 text-amber-warm" />
          <h3 className="text-sm font-medium text-cream-300 uppercase tracking-wider">Color Palette</h3>
        </div>
        <div className="flex gap-3 flex-wrap">
          {board.colorPalette.map((color, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div
                className="w-16 h-16 md:w-20 md:h-20 rounded-2xl shadow-lg border border-white/10"
                style={{ backgroundColor: color.hex }}
              />
              <span className="text-[11px] text-cream-400 text-center max-w-[5rem]">{color.name}</span>
              <span className="text-[10px] text-cream-400/50 font-mono">{color.hex}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Two-column grid: Emotions + Atmosphere */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Core Emotions */}
        <section className="bg-night-900 rounded-3xl border border-night-700 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-4 h-4 text-rose-warm" />
            <h3 className="text-sm font-medium text-cream-300 uppercase tracking-wider">Core Emotions</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {board.coreEmotions.map((emotion, i) => (
              <span
                key={i}
                className="px-3 py-1.5 bg-rose-warm/10 border border-rose-warm/20 text-rose-warm rounded-full text-sm"
              >
                {emotion}
              </span>
            ))}
          </div>
        </section>

        {/* Aesthetic Tags */}
        <section className="bg-night-900 rounded-3xl border border-night-700 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-4 h-4 text-peach-warm" />
            <h3 className="text-sm font-medium text-cream-300 uppercase tracking-wider">Aesthetic</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {board.aestheticTags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1.5 bg-peach-warm/10 border border-peach-warm/20 text-peach-warm rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* Atmosphere */}
      <section className="bg-night-900 rounded-3xl border border-night-700 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Cloud className="w-4 h-4 text-sage-warm" />
          <h3 className="text-sm font-medium text-cream-300 uppercase tracking-wider">Atmosphere</h3>
        </div>
        <p className="text-cream-200 leading-relaxed font-serif italic text-lg">
          {board.atmosphere}
        </p>
      </section>

      {/* Two-column: Soundtrack + Best Setting */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Soundtrack Mood */}
        <section className="bg-night-900 rounded-3xl border border-night-700 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Music className="w-4 h-4 text-amber-warm" />
            <h3 className="text-sm font-medium text-cream-300 uppercase tracking-wider">Soundtrack Mood</h3>
          </div>
          <p className="text-cream-200 text-sm leading-relaxed">
            {board.soundtrackMood}
          </p>
          {board.playlist && board.playlist.length > 0 && (
            <ol className="mt-4 space-y-2 border-t border-night-700 pt-4">
              {board.playlist.map((track, i) => (
                <li key={i} className="flex items-baseline gap-2 text-sm">
                  <span className="text-cream-400/50 text-xs w-4 shrink-0">{i + 1}.</span>
                  <span className="text-cream-100 font-medium">{track.title}</span>
                  <span className="text-cream-400">— {track.artist}</span>
                </li>
              ))}
            </ol>
          )}
        </section>

        {/* Best Setting */}
        <section className="bg-night-900 rounded-3xl border border-night-700 p-6">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-amber-warm" />
            <h3 className="text-sm font-medium text-cream-300 uppercase tracking-wider">Best Enjoyed</h3>
          </div>
          <p className="text-cream-200 text-sm leading-relaxed">
            {board.bestSetting}
          </p>
        </section>
      </div>

      {/* Textures */}
      <section className="bg-night-900 rounded-3xl border border-night-700 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Layers className="w-4 h-4 text-cream-300" />
          <h3 className="text-sm font-medium text-cream-300 uppercase tracking-wider">Textures & Sensations</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {board.textures.map((texture, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="w-full aspect-square rounded-2xl overflow-hidden bg-night-800 border border-night-700">
                {textureImages[i] ? (
                  <img
                    src={textureImages[i]!}
                    alt={texture}
                    className="w-full h-full object-cover transition-opacity duration-500"
                  />
                ) : imagesLoading[i] ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-cream-400/30 border-t-cream-400 rounded-full animate-spin" />
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Layers className="w-8 h-8 text-cream-400/20" />
                  </div>
                )}
              </div>
              <span className="text-xs text-cream-300 text-center">{texture}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Similar Vibes */}
      <section className="bg-night-900 rounded-3xl border border-night-700 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Compass className="w-4 h-4 text-peach-warm" />
          <h3 className="text-sm font-medium text-cream-300 uppercase tracking-wider">Similar Vibes</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {board.similarVibes.map((vibe, i) => {
            const categoryEmoji = {
              game: '🎮',
              movie: '🎬',
              music: '🎵',
              art: '🎨',
              book: '📖',
            }[vibe.category];

            const vibeKey = `${vibe.category}-${vibe.title}`;
            const vibeImg = vibeImages[vibeKey];
            const vibeLoading = vibeImagesLoading[vibeKey];
            const hasImage = vibe.category === 'game' || vibe.category === 'movie';

            return (
              <div
                key={i}
                className="bg-night-800 border border-night-700 rounded-2xl overflow-hidden hover:border-amber-warm/30 transition-colors"
              >
                {hasImage && (
                  <div className="w-full aspect-[3/2] bg-night-900 relative">
                    {vibeImg ? (
                      <img src={vibeImg} alt={vibe.title} className="w-full h-full object-cover" />
                    ) : vibeLoading ? (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-cream-400/30 border-t-cream-400 rounded-full animate-spin" />
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-2xl">{categoryEmoji}</span>
                      </div>
                    )}
                  </div>
                )}
                <div className="p-3 text-center">
                  {!hasImage && <span className="text-lg">{categoryEmoji}</span>}
                  <p className="text-cream-200 text-sm mt-1 font-medium">{vibe.title}</p>
                  <p className="text-cream-400/50 text-xs mt-0.5">{vibe.category}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Try another */}
      <div className="text-center pt-4">
        <button
          onClick={onReset}
          className="px-6 py-3 bg-night-800 text-cream-200 rounded-full border border-night-700 hover:border-amber-warm/40 hover:text-amber-warm transition-all"
        >
          Create another mood board
        </button>
      </div>
    </div>
  );
}
