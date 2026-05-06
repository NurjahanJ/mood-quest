/**
 * FILE: PreferenceForm.tsx
 * PURPOSE: Dynamic form for collecting user preferences
 * 
 * FEATURES:
 * - Adapts fields based on category (games vs movies)
 * - Client-side validation before submission
 * - Professional form design
 * - Clear field labels and descriptions
 * - Handles avoid input (comma-separated)
 * 
 * DEPENDENCIES:
 * - types.ts (UserPreferences, RecommendationType, Mood, etc.)
 * - validation.ts (validatePreferences)
 * 
 * USED BY:
 * - page.tsx (main application flow)
 * 
 * STATUS: Complete
 * DO NOT MODIFY: No - Can be updated for UX improvements
 */

'use client';

import { useState } from 'react';
import { 
  UserPreferences, 
  RecommendationType,
  RecommendationMode,
  Mood,
  TimeAvailable,
  Platform,
  StreamingPlatform,
  PlayStyle,
  Genre,
  MovieGenre
} from '@/lib/types';
import { validatePreferences } from '@/lib/validation';

interface PreferenceFormProps {
  category: RecommendationType;
  mode: RecommendationMode;
  onSubmit: (preferences: UserPreferences) => void;
  isLoading: boolean;
}

/**
 * PreferenceForm Component
 * 
 * Dynamically renders form fields based on selected category.
 * 
 * GAME FIELDS:
 * - Mood (required)
 * - Time Available (required)
 * - Platform (required)
 * - Play Style (required)
 * - Preferred Genre (optional)
 * - Avoid (optional, comma-separated)
 * 
 * MOVIE FIELDS:
 * - Mood (required) - different options than games
 * - Time Available (required) - different options than games
 * - Streaming Platform (required)
 * - Preferred Genre (optional)
 * - Avoid (optional, comma-separated)
 * 
 * @param category - 'games' or 'movies'
 * @param mode - Selected recommendation mode
 * @param onSubmit - Callback when form is submitted
 * @param isLoading - Whether submission is in progress
 */

export default function PreferenceForm({ 
  category, 
  mode, 
  onSubmit, 
  isLoading 
}: PreferenceFormProps) {
  // Form state
  const [mood, setMood] = useState<Mood | ''>('');
  const [timeAvailable, setTimeAvailable] = useState<TimeAvailable | ''>('');
  const [platform, setPlatform] = useState<Platform | ''>('');
  const [streamingPlatform, setStreamingPlatform] = useState<StreamingPlatform | ''>('');
  const [playStyle, setPlayStyle] = useState<PlayStyle | ''>('');
  const [preferredGenre, setPreferredGenre] = useState<Genre | MovieGenre>('No preference');
  const [avoidInput, setAvoidInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const avoid = avoidInput
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0);

    const preferences: Partial<UserPreferences> = {
      type: category,
      mode: mode,
      mood: mood as Mood,
      timeAvailable: timeAvailable as TimeAvailable,
      avoid
    };

    if (category === 'games') {
      preferences.platform = platform as Platform;
      preferences.playStyle = playStyle as PlayStyle;
      if (preferredGenre !== 'No preference') {
        preferences.preferredGenre = preferredGenre as Genre;
      }
    } else {
      preferences.streamingPlatform = streamingPlatform as StreamingPlatform;
      if (preferredGenre !== 'No preference') {
        preferences.preferredMovieGenre = preferredGenre as MovieGenre;
      }
    }

    const validation = validatePreferences(preferences);
    if (!validation.isValid) {
      setError(validation.error || 'Please fill in all required fields');
      return;
    }

    onSubmit(preferences as UserPreferences);
  };

  // Mood options with emoji prefixes
  const moodOptions = category === 'games'
    ? [
        { label: '😌 Relaxing', value: 'Relaxing' },
        { label: '🛋️ Cozy', value: 'Cozy' },
        { label: '🔥 Competitive', value: 'Competitive' },
        { label: '📖 Story-driven', value: 'Story-driven' },
        { label: '🧠 Strategic', value: 'Strategic' },
        { label: '💥 Chaotic', value: 'Chaotic' },
      ]
    : [
        { label: '🤗 Comforting', value: 'Comforting' },
        { label: '😄 Funny', value: 'Funny' },
        { label: '🥺 Emotional', value: 'Emotional' },
        { label: '😰 Suspenseful', value: 'Suspenseful' },
        { label: '💭 Thought-provoking', value: 'Thought-provoking' },
        { label: '🌍 Adventurous', value: 'Adventurous' },
        { label: '💕 Romantic', value: 'Romantic' },
        { label: '🌑 Dark', value: 'Dark' },
      ];

  const timeOptions = category === 'games'
    ? ['Under 30 minutes', 'About 1 hour', 'Several hours']
    : ['Under 90 minutes', 'About 2 hours', 'Long movie is okay'];

  const genreOptions = category === 'games'
    ? ['RPG', 'Puzzle', 'Simulation', 'Adventure', 'Action', 'Strategy', 'No preference']
    : ['Comedy', 'Drama', 'Romance', 'Thriller', 'Sci-Fi', 'Fantasy', 'Animation', 'Documentary', 'Horror', 'No preference'];

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      {/* Mood Selection */}
      <div>
        <label className="block text-sm font-medium text-cream-300 mb-3">
          How are you feeling? <span className="text-amber-warm">*</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {moodOptions.map((moodOption) => (
            <button
              key={moodOption.value}
              type="button"
              onClick={() => setMood(moodOption.value as Mood)}
              className={`px-4 py-3 rounded-2xl border transition-all duration-200 text-sm font-medium ${
                mood === moodOption.value
                  ? 'border-amber-warm bg-amber-warm/15 text-cream-50'
                  : 'border-night-700 bg-night-800/50 text-cream-400 hover:border-amber-warm/30 hover:text-cream-200'
              }`}
            >
              {moodOption.label}
            </button>
          ))}
        </div>
      </div>

      {/* Time Available */}
      <div>
        <label className="block text-sm font-medium text-cream-300 mb-3">
          How much time do you have? <span className="text-amber-warm">*</span>
        </label>
        <select
          value={timeAvailable}
          onChange={(e) => setTimeAvailable(e.target.value as TimeAvailable)}
          className="w-full px-4 py-3 bg-night-800 border border-night-700 rounded-2xl text-cream-50 focus:ring-2 focus:ring-amber-warm/50 focus:border-amber-warm/50 transition-all"
          required
        >
          <option value="">Pick a timeframe</option>
          {timeOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      {/* Game-Specific Fields */}
      {category === 'games' && (
        <>
          <div>
            <label className="block text-sm font-medium text-cream-300 mb-3">
              What platform? <span className="text-amber-warm">*</span>
            </label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value as Platform)}
              className="w-full px-4 py-3 bg-night-800 border border-night-700 rounded-2xl text-cream-50 focus:ring-2 focus:ring-amber-warm/50 focus:border-amber-warm/50 transition-all"
              required
            >
              <option value="">Pick your platform</option>
              <option value="PC">PC</option>
              <option value="Nintendo Switch">Nintendo Switch</option>
              <option value="PlayStation">PlayStation</option>
              <option value="Xbox">Xbox</option>
              <option value="Mobile">Mobile</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-cream-300 mb-3">
              Playing with others? <span className="text-amber-warm">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(['Solo', 'Co-op', 'Multiplayer', 'Either'] as PlayStyle[]).map((style) => (
                <button
                  key={style}
                  type="button"
                  onClick={() => setPlayStyle(style)}
                  className={`px-4 py-3 rounded-2xl border transition-all duration-200 text-sm font-medium ${
                    playStyle === style
                      ? 'border-amber-warm bg-amber-warm/15 text-cream-50'
                      : 'border-night-700 bg-night-800/50 text-cream-400 hover:border-amber-warm/30 hover:text-cream-200'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Movie-Specific Fields */}
      {category === 'movies' && (
        <div>
          <label className="block text-sm font-medium text-cream-300 mb-3">
            Where are you watching? <span className="text-amber-warm">*</span>
          </label>
          <select
            value={streamingPlatform}
            onChange={(e) => setStreamingPlatform(e.target.value as StreamingPlatform)}
            className="w-full px-4 py-3 bg-night-800 border border-night-700 rounded-2xl text-cream-50 focus:ring-2 focus:ring-amber-warm/50 focus:border-amber-warm/50 transition-all"
            required
          >
            <option value="">Pick your platform</option>
            <option value="Netflix">Netflix</option>
            <option value="Amazon Prime">Amazon Prime</option>
            <option value="Disney+">Disney+</option>
            <option value="HBO Max">HBO Max</option>
            <option value="Hulu">Hulu</option>
            <option value="Apple TV+">Apple TV+</option>
            <option value="Any">Anywhere is fine</option>
          </select>
        </div>
      )}

      {/* Preferred Genre */}
      <div>
        <label className="block text-sm font-medium text-cream-300 mb-3">
          Any genre preference?
        </label>
        <select
          value={preferredGenre}
          onChange={(e) => setPreferredGenre(e.target.value as Genre | MovieGenre)}
          className="w-full px-4 py-3 bg-night-800 border border-night-700 rounded-2xl text-cream-50 focus:ring-2 focus:ring-amber-warm/50 focus:border-amber-warm/50 transition-all"
        >
          {genreOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      {/* Avoid Input */}
      <div>
        <label className="block text-sm font-medium text-cream-300 mb-3">
          Anything to steer clear of?
        </label>
        <input
          type="text"
          value={avoidInput}
          onChange={(e) => setAvoidInput(e.target.value)}
          placeholder={category === 'games' ? 'e.g., horror, violence, grinding' : 'e.g., sad endings, violence, slow pacing'}
          className="w-full px-4 py-3 bg-night-800 border border-night-700 rounded-2xl text-cream-50 placeholder-cream-400/40 focus:ring-2 focus:ring-amber-warm/50 focus:border-amber-warm/50 transition-all"
        />
        <p className="mt-2 text-xs text-cream-400/60">
          Separate multiple items with commas
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-rose-warm/10 border border-rose-warm/30 rounded-2xl p-4">
          <p className="text-rose-warm text-sm">{error}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-6 py-4 bg-gradient-to-r from-amber-warm to-peach-warm text-night-950 font-semibold rounded-full hover:opacity-90 focus:ring-4 focus:ring-amber-warm/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-amber-warm/20"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-3">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Lumi is thinking…
          </span>
        ) : (
          'Find me something'
        )}
      </button>
    </form>
  );
}
