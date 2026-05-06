'use client';

import { useState, useEffect } from 'react';
import { MoodBoard } from '@/lib/types';
import { Palette, Heart, Cloud, Music, MapPin, Layers, Compass } from 'lucide-react';

interface MoodBoardDisplayProps {
  board: MoodBoard;
  onReset: () => void;
}

export default function MoodBoardDisplay({ board, onReset }: MoodBoardDisplayProps) {
  const [textureImages, setTextureImages] = useState<(string | null)[]>([]);
  const [imagesLoading, setImagesLoading] = useState(false);

  useEffect(() => {
    if (!board.textures || board.textures.length === 0) return;
    // If images were already provided (cached), skip fetching
    if (board.textureImages && board.textureImages.length > 0) {
      setTextureImages(board.textureImages);
      return;
    }

    let cancelled = false;
    setImagesLoading(true);

    fetch('/api/generate-texture-images', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ textures: board.textures }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && data.images) {
          setTextureImages(data.images);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setImagesLoading(false);
      });

    return () => { cancelled = true; };
  }, [board.textures, board.textureImages]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-3">
        <p className="text-cream-400 text-sm uppercase tracking-wider">
          {board.category === 'game' ? '🎮 Game' : '🎬 Movie'} Mood Board
        </p>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-cream-50">
          {board.title}
        </h2>
        <p className="text-lg text-cream-300 font-serif italic">
          &ldquo;{board.tagline}&rdquo;
        </p>
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
                ) : imagesLoading ? (
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

            return (
              <div
                key={i}
                className="bg-night-800 border border-night-700 rounded-2xl p-3 text-center hover:border-amber-warm/30 transition-colors"
              >
                <span className="text-lg">{categoryEmoji}</span>
                <p className="text-cream-200 text-sm mt-1 font-medium">{vibe.title}</p>
                <p className="text-cream-400/50 text-xs mt-0.5">{vibe.category}</p>
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
