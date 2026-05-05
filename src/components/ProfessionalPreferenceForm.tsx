'use client';

import { useState } from 'react';
import { UserPreferences, Mood, TimeAvailable, Platform, PlayStyle, Genre, StreamingPlatform, MovieGenre, RecommendationType } from '@/lib/types';

interface ProfessionalPreferenceFormProps {
  onSubmit: (preferences: UserPreferences) => void;
  isLoading: boolean;
}

export default function ProfessionalPreferenceForm({ onSubmit, isLoading }: ProfessionalPreferenceFormProps) {
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

    if (!mood || !timeAvailable) {
      alert('Please fill in all required fields');
      return;
    }

    if (type === 'games' && (!platform || !playStyle)) {
      alert('Please select platform and play style for game recommendations');
      return;
    }

    if (type === 'movies' && !streamingPlatform) {
      alert('Please select a streaming platform for movie recommendations');
      return;
    }

    const avoid = avoidInput
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0);

    const preferences: UserPreferences = {
      type,
      mood,
      timeAvailable,
      platform: type === 'games' ? platform : undefined,
      streamingPlatform: type === 'movies' ? streamingPlatform : undefined,
      playStyle: type === 'games' ? playStyle : undefined,
      preferredGenre: type === 'games' && preferredGenre !== 'No preference' ? preferredGenre : undefined,
      preferredMovieGenre: type === 'movies' && preferredMovieGenre !== 'No preference' ? preferredMovieGenre : undefined,
      avoid: avoid.length > 0 ? avoid : undefined,
    };

    onSubmit(preferences);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Type Toggle */}
      <div className="border-b border-gray-700 pb-6">
        <label className="block text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
          Recommendation Type
        </label>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setType('games')}
            className={`flex-1 px-6 py-3.5 rounded-lg font-medium transition-all duration-200 ${
              type === 'games'
                ? 'bg-white text-gray-900 shadow-lg'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-750 hover:text-gray-300'
            }`}
          >
            Games
          </button>
          <button
            type="button"
            onClick={() => setType('movies')}
            className={`flex-1 px-6 py-3.5 rounded-lg font-medium transition-all duration-200 ${
              type === 'movies'
                ? 'bg-white text-gray-900 shadow-lg'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-750 hover:text-gray-300'
            }`}
          >
            Movies
          </button>
        </div>
      </div>

      {/* Mood Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
          Current Mood <span className="text-red-400">*</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {(['Relaxing', 'Cozy', 'Competitive', 'Story-driven', 'Strategic', 'Chaotic'] as Mood[]).map((moodOption) => (
            <button
              key={moodOption}
              type="button"
              onClick={() => setMood(moodOption)}
              className={`px-5 py-3.5 rounded-lg border transition-all duration-200 text-sm font-medium ${
                mood === moodOption
                  ? 'border-white bg-white/10 text-white shadow-md'
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
          className="w-full px-4 py-3.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-white focus:border-transparent transition-all"
          required
        >
          <option value="">Select duration</option>
          <option value="Under 30 minutes">Under 30 minutes</option>
          <option value="About 1 hour">About 1 hour</option>
          <option value="Several hours">Several hours</option>
        </select>
      </div>

      {/* Conditional Fields for Games */}
      {type === 'games' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
              Platform <span className="text-red-400">*</span>
            </label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value as Platform)}
              className="w-full px-4 py-3.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-white focus:border-transparent transition-all"
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

          <div>
            <label className="block text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
              Preferred Genre
            </label>
            <select
              value={preferredGenre}
              onChange={(e) => setPreferredGenre(e.target.value as Genre)}
              className="w-full px-4 py-3.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-white focus:border-transparent transition-all"
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

      {/* Conditional Fields for Movies */}
      {type === 'movies' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
              Streaming Platform <span className="text-red-400">*</span>
            </label>
            <select
              value={streamingPlatform}
              onChange={(e) => setStreamingPlatform(e.target.value as StreamingPlatform)}
              className="w-full px-4 py-3.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-white focus:border-transparent transition-all"
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

          <div>
            <label className="block text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
              Preferred Genre
            </label>
            <select
              value={preferredMovieGenre}
              onChange={(e) => setPreferredMovieGenre(e.target.value as MovieGenre)}
              className="w-full px-4 py-3.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-white focus:border-transparent transition-all"
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

      {/* Avoid Input */}
      <div>
        <label className="block text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
          Exclusions
        </label>
        <input
          type="text"
          value={avoidInput}
          onChange={(e) => setAvoidInput(e.target.value)}
          placeholder={type === 'games' ? 'e.g., horror, violence, grinding' : 'e.g., sad endings, violence, slow pacing'}
          className="w-full px-4 py-3.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-white focus:border-transparent transition-all"
        />
        <p className="mt-2 text-xs text-gray-500">
          Separate multiple items with commas
        </p>
      </div>

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
            Analyzing preferences...
          </span>
        ) : (
          `Get Recommendations`
        )}
      </button>
    </form>
  );
}
