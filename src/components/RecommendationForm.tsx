'use client';

import { useState } from 'react';
import { Gamepad2, Film } from 'lucide-react';
import {
  UserPreferences,
  RecommendationType,
  Mood,
  TimeAvailable,
  Platform,
  StreamingPlatform,
  PlayStyle,
  Genre,
  MovieGenre,
} from '@/lib/types';

interface RecommendationFormProps {
  onSubmit: (preferences: UserPreferences) => void;
  isLoading: boolean;
}

export default function RecommendationForm({ onSubmit, isLoading }: RecommendationFormProps) {
  const [type, setType] = useState<RecommendationType>('games');
  const [mood, setMood] = useState<Mood | ''>('');
  const [timeAvailable, setTimeAvailable] = useState<TimeAvailable | ''>('');
  const [platform, setPlatform] = useState<Platform | ''>('');
  const [streamingPlatform, setStreamingPlatform] = useState<StreamingPlatform | ''>('');
  const [playStyle, setPlayStyle] = useState<PlayStyle | ''>('');
  const [preferredGenre, setPreferredGenre] = useState<Genre>('No preference');
  const [preferredMovieGenre, setPreferredMovieGenre] = useState<MovieGenre>('No preference');
  const [avoidInput, setAvoidInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mood || !timeAvailable) return;
    if (type === 'games' && (!platform || !playStyle)) return;

    const avoid = avoidInput.split(',').map(s => s.trim()).filter(Boolean);

    const preferences: UserPreferences = {
      type,
      mood,
      timeAvailable,
      platform: type === 'games' ? (platform as Platform) : undefined,
      streamingPlatform: type === 'movies' ? (streamingPlatform as StreamingPlatform) || 'Any' : undefined,
      playStyle: type === 'games' ? (playStyle as PlayStyle) : undefined,
      preferredGenre: type === 'games' && preferredGenre !== 'No preference' ? preferredGenre : undefined,
      preferredMovieGenre: type === 'movies' && preferredMovieGenre !== 'No preference' ? preferredMovieGenre : undefined,
      avoid: avoid.length > 0 ? avoid : undefined,
    };

    onSubmit(preferences);
  };

  const moods: Mood[] = ['Relaxing', 'Cozy', 'Competitive', 'Story-driven', 'Strategic', 'Chaotic'];

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-6">
      {/* Type toggle */}
      <div className="flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => setType('games')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
            type === 'games'
              ? 'bg-amber-warm/20 text-amber-warm border border-amber-warm/40'
              : 'bg-night-800 text-cream-400 border border-night-700 hover:text-cream-200'
          }`}
        >
          <Gamepad2 className="w-4 h-4" />
          Games
        </button>
        <button
          type="button"
          onClick={() => setType('movies')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
            type === 'movies'
              ? 'bg-rose-warm/20 text-rose-warm border border-rose-warm/40'
              : 'bg-night-800 text-cream-400 border border-night-700 hover:text-cream-200'
          }`}
        >
          <Film className="w-4 h-4" />
          Movies
        </button>
      </div>

      {/* Mood */}
      <div>
        <label className="block text-sm font-medium text-cream-300 mb-3">
          What&apos;s your mood? <span className="text-rose-warm">*</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {moods.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMood(m)}
              className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                mood === m
                  ? 'border-amber-warm/60 bg-amber-warm/10 text-amber-warm'
                  : 'border-night-700 bg-night-800 text-cream-400 hover:border-night-600 hover:text-cream-200'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Time */}
      <div>
        <label className="block text-sm font-medium text-cream-300 mb-2">
          How much time? <span className="text-rose-warm">*</span>
        </label>
        <select
          value={timeAvailable}
          onChange={(e) => setTimeAvailable(e.target.value as TimeAvailable)}
          className="w-full px-4 py-3 bg-night-800 border border-night-700 rounded-xl text-cream-50 focus:ring-2 focus:ring-amber-warm/40 focus:border-amber-warm/40 transition-all"
          required
        >
          <option value="">Select time available</option>
          <option value="Under 30 minutes">Under 30 minutes</option>
          <option value="About 1 hour">About 1 hour</option>
          <option value="Several hours">Several hours</option>
        </select>
      </div>

      {/* Games-specific */}
      {type === 'games' && (
        <>
          <div>
            <label className="block text-sm font-medium text-cream-300 mb-2">
              Platform <span className="text-rose-warm">*</span>
            </label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value as Platform)}
              className="w-full px-4 py-3 bg-night-800 border border-night-700 rounded-xl text-cream-50 focus:ring-2 focus:ring-amber-warm/40 focus:border-amber-warm/40 transition-all"
              required
            >
              <option value="">Select platform</option>
              <option value="PC">PC</option>
              <option value="Nintendo Switch">Nintendo Switch</option>
              <option value="PlayStation">PlayStation</option>
              <option value="Xbox">Xbox</option>
              <option value="Mobile">Mobile</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-cream-300 mb-2">
              Play Style <span className="text-rose-warm">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {(['Solo', 'Co-op', 'Multiplayer', 'Either'] as PlayStyle[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setPlayStyle(s)}
                  className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                    playStyle === s
                      ? 'border-amber-warm/60 bg-amber-warm/10 text-amber-warm'
                      : 'border-night-700 bg-night-800 text-cream-400 hover:border-night-600 hover:text-cream-200'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-cream-300 mb-2">Preferred Genre</label>
            <select
              value={preferredGenre}
              onChange={(e) => setPreferredGenre(e.target.value as Genre)}
              className="w-full px-4 py-3 bg-night-800 border border-night-700 rounded-xl text-cream-50 focus:ring-2 focus:ring-amber-warm/40 focus:border-amber-warm/40 transition-all"
            >
              <option value="No preference">No preference</option>
              <option value="RPG">RPG</option>
              <option value="Puzzle">Puzzle</option>
              <option value="Simulation">Simulation</option>
              <option value="Adventure">Adventure</option>
              <option value="Action">Action</option>
              <option value="Strategy">Strategy</option>
            </select>
          </div>
        </>
      )}

      {/* Movies-specific */}
      {type === 'movies' && (
        <>
          <div>
            <label className="block text-sm font-medium text-cream-300 mb-2">Streaming Platform</label>
            <select
              value={streamingPlatform}
              onChange={(e) => setStreamingPlatform(e.target.value as StreamingPlatform)}
              className="w-full px-4 py-3 bg-night-800 border border-night-700 rounded-xl text-cream-50 focus:ring-2 focus:ring-amber-warm/40 focus:border-amber-warm/40 transition-all"
            >
              <option value="">Any Platform</option>
              <option value="Netflix">Netflix</option>
              <option value="Amazon Prime">Amazon Prime</option>
              <option value="Disney+">Disney+</option>
              <option value="HBO Max">HBO Max</option>
              <option value="Hulu">Hulu</option>
              <option value="Apple TV+">Apple TV+</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-cream-300 mb-2">Preferred Genre</label>
            <select
              value={preferredMovieGenre}
              onChange={(e) => setPreferredMovieGenre(e.target.value as MovieGenre)}
              className="w-full px-4 py-3 bg-night-800 border border-night-700 rounded-xl text-cream-50 focus:ring-2 focus:ring-amber-warm/40 focus:border-amber-warm/40 transition-all"
            >
              <option value="No preference">No preference</option>
              <option value="Drama">Drama</option>
              <option value="Comedy">Comedy</option>
              <option value="Thriller">Thriller</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Romance">Romance</option>
              <option value="Documentary">Documentary</option>
              <option value="Animation">Animation</option>
            </select>
          </div>
        </>
      )}

      {/* Avoid */}
      <div>
        <label className="block text-sm font-medium text-cream-300 mb-2">Things to avoid</label>
        <input
          type="text"
          value={avoidInput}
          onChange={(e) => setAvoidInput(e.target.value)}
          placeholder="e.g., horror, violence, grinding (comma-separated)"
          className="w-full px-4 py-3 bg-night-800 border border-night-700 rounded-xl text-cream-50 placeholder-cream-400/30 focus:ring-2 focus:ring-amber-warm/40 focus:border-amber-warm/40 transition-all"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading || !mood || !timeAvailable}
        className="w-full px-6 py-4 bg-gradient-to-r from-amber-warm to-peach-warm text-night-950 font-semibold rounded-xl hover:opacity-90 focus:ring-4 focus:ring-amber-warm/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Finding your picks…
          </span>
        ) : (
          `Get ${type === 'games' ? 'Game' : 'Movie'} Recommendations`
        )}
      </button>
    </form>
  );
}
