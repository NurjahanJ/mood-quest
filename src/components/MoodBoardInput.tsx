'use client';

import { useState } from 'react';
import { Gamepad2, Film, Sparkles } from 'lucide-react';
import { BoardCategory } from '@/lib/types';

interface MoodBoardInputProps {
  onSubmit: (title: string, category: BoardCategory) => void;
  isLoading: boolean;
}

export default function MoodBoardInput({ onSubmit, isLoading }: MoodBoardInputProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<BoardCategory>('game');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(title.trim(), category);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto space-y-6">
      {/* Category toggle */}
      <div className="flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => setCategory('game')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            category === 'game'
              ? 'bg-amber-warm/20 text-amber-warm border border-amber-warm/40'
              : 'bg-night-800 text-cream-400 border border-night-700 hover:border-amber-warm/20 hover:text-cream-200'
          }`}
        >
          <Gamepad2 className="w-4 h-4" />
          Game
        </button>
        <button
          type="button"
          onClick={() => setCategory('movie')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            category === 'movie'
              ? 'bg-rose-warm/20 text-rose-warm border border-rose-warm/40'
              : 'bg-night-800 text-cream-400 border border-night-700 hover:border-rose-warm/20 hover:text-cream-200'
          }`}
        >
          <Film className="w-4 h-4" />
          Movie
        </button>
      </div>

      {/* Chat-like input */}
      <div className="relative">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={category === 'game' ? 'e.g., Hollow Knight, Stardew Valley...' : 'e.g., Spirited Away, Blade Runner...'}
          className="w-full px-5 py-4 pr-14 bg-night-800 border border-night-700 rounded-full text-cream-50 placeholder-cream-400/40 focus:ring-2 focus:ring-amber-warm/40 focus:border-amber-warm/40 transition-all text-lg"
          disabled={isLoading}
          autoFocus
        />
        <button
          type="submit"
          disabled={!title.trim() || isLoading}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-amber-warm to-peach-warm text-night-950 disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 transition-all"
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : (
            <Sparkles className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Helper text */}
      <p className="text-center text-cream-400/50 text-xs">
        Type any {category} title and I&apos;ll create its mood board
      </p>
    </form>
  );
}
