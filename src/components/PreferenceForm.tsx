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

  /**
   * Handle form submission
   * 
   * PROCESS:
   * 1. Parse avoid input (comma-separated)
   * 2. Build preferences object
   * 3. Validate preferences
   * 4. Call onSubmit if valid
   * 5. Show error if invalid
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Parse avoid input
    const avoid = avoidInput
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0);

    // Build preferences object
    const preferences: Partial<UserPreferences> = {
      type: category,
      mode: mode,
      mood: mood as Mood,
      timeAvailable: timeAvailable as TimeAvailable,
      avoid
    };

    // Add category-specific fields
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

    // Validate
    const validation = validatePreferences(preferences);
    if (!validation.isValid) {
      setError(validation.error || 'Please fill in all required fields');
      return;
    }

    // Submit
    onSubmit(preferences as UserPreferences);
  };

  // Mood options based on category
  const moodOptions = category === 'games'
    ? ['Relaxing', 'Cozy', 'Competitive', 'Story-driven', 'Strategic', 'Chaotic']
    : ['Comforting', 'Funny', 'Emotional', 'Suspenseful', 'Thought-provoking', 'Adventurous', 'Romantic', 'Dark'];

  // Time options based on category
  const timeOptions = category === 'games'
    ? ['Under 30 minutes', 'About 1 hour', 'Several hours']
    : ['Under 90 minutes', 'About 2 hours', 'Long movie is okay'];

  // Genre options based on category
  const genreOptions = category === 'games'
    ? ['RPG', 'Puzzle', 'Simulation', 'Adventure', 'Action', 'Strategy', 'No preference']
    : ['Comedy', 'Drama', 'Romance', 'Thriller', 'Sci-Fi', 'Fantasy', 'Animation', 'Documentary', 'Horror', 'No preference'];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Mood Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
          Current Mood <span className="text-red-400">*</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {moodOptions.map((moodOption) => (
            <button
              key={moodOption}
              type="button"
              onClick={() => setMood(moodOption as Mood)}
              className={`px-4 py-3 rounded-lg border transition-all duration-200 text-sm font-medium ${
                mood === moodOption
                  ? 'border-white bg-white/10 text-white'
                  : 'border-gray-700 bg-gray-800/50 text-gray-400 hover:border-gray-600 hover:text-gray-300'
              }`}
            >
              {moodOption}
            </button>
          ))}
        </div>
      </div>

      {/* Time Available */}
      <div>
        <label className="block text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
          Available Time <span className="text-red-400">*</span>
        </label>
        <select
          value={timeAvailable}
          onChange={(e) => setTimeAvailable(e.target.value as TimeAvailable)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-white focus:border-transparent transition-all"
          required
        >
          <option value="">Select duration</option>
          {timeOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      {/* Game-Specific Fields */}
      {category === 'games' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
              Platform <span className="text-red-400">*</span>
            </label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value as Platform)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-white focus:border-transparent transition-all"
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
            <label className="block text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
              Play Style <span className="text-red-400">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(['Solo', 'Co-op', 'Multiplayer', 'Either'] as PlayStyle[]).map((style) => (
                <button
                  key={style}
                  type="button"
                  onClick={() => setPlayStyle(style)}
                  className={`px-4 py-3 rounded-lg border transition-all duration-200 text-sm font-medium ${
                    playStyle === style
                      ? 'border-white bg-white/10 text-white'
                      : 'border-gray-700 bg-gray-800/50 text-gray-400 hover:border-gray-600 hover:text-gray-300'
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
          <label className="block text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
            Streaming Platform <span className="text-red-400">*</span>
          </label>
          <select
            value={streamingPlatform}
            onChange={(e) => setStreamingPlatform(e.target.value as StreamingPlatform)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-white focus:border-transparent transition-all"
            required
          >
            <option value="">Select platform</option>
            <option value="Netflix">Netflix</option>
            <option value="Amazon Prime">Amazon Prime</option>
            <option value="Disney+">Disney+</option>
            <option value="HBO Max">HBO Max</option>
            <option value="Hulu">Hulu</option>
            <option value="Apple TV+">Apple TV+</option>
            <option value="Any">Any Platform</option>
          </select>
        </div>
      )}

      {/* Preferred Genre */}
      <div>
        <label className="block text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
          Preferred Genre
        </label>
        <select
          value={preferredGenre}
          onChange={(e) => setPreferredGenre(e.target.value as Genre | MovieGenre)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-white focus:border-transparent transition-all"
        >
          {genreOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      {/* Avoid Input */}
      <div>
        <label className="block text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
          Things to Avoid
        </label>
        <input
          type="text"
          value={avoidInput}
          onChange={(e) => setAvoidInput(e.target.value)}
          placeholder={category === 'games' ? 'e.g., horror, violence, grinding' : 'e.g., sad endings, violence, slow pacing'}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-white focus:border-transparent transition-all"
        />
        <p className="mt-2 text-xs text-gray-500">
          Separate multiple items with commas
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-6 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-white/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-3">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Finding recommendations...
          </span>
        ) : (
          `Get ${category === 'games' ? 'Game' : 'Movie'} Recommendations`
        )}
      </button>
    </form>
  );
}
