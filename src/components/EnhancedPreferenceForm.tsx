'use client';

import { useState } from 'react';
import { UserPreferences, Mood, TimeAvailable, Platform, PlayStyle, Genre, StreamingPlatform, MovieGenre, RecommendationType } from '@/lib/types';

interface EnhancedPreferenceFormProps {
  onSubmit: (preferences: UserPreferences) => void;
  isLoading: boolean;
}

export default function EnhancedPreferenceForm({ onSubmit, isLoading }: EnhancedPreferenceFormProps) {
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

  const getMoodEmoji = (moodValue: string) => {
    const emojiMap: Record<string, string> = {
      'Relaxing': '🧘',
      'Cozy': '☕',
      'Competitive': '🏆',
      'Story-driven': '📖',
      'Strategic': '♟️',
      'Chaotic': '🎭',
    };
    return emojiMap[moodValue] || '';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Type Toggle */}
      <div className="flex gap-2 p-1 bg-gray-900 rounded-lg">
        <button
          type="button"
          onClick={() => setType('games')}
          className={`flex-1 px-6 py-3 rounded-md font-semibold transition-all duration-300 ${
            type === 'games'
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          🎮 Games
        </button>
        <button
          type="button"
          onClick={() => setType('movies')}
          className={`flex-1 px-6 py-3 rounded-md font-semibold transition-all duration-300 ${
            type === 'movies'
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          🎬 Movies
        </button>
      </div>

      {/* Mood Selection with Emojis */}
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-3">
          What's your mood? <span className="text-red-400">*</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {(['Relaxing', 'Cozy', 'Competitive', 'Story-driven', 'Strategic', 'Chaotic'] as Mood[]).map((moodOption) => (
            <button
              key={moodOption}
              type="button"
              onClick={() => setMood(moodOption)}
              className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                mood === moodOption
                  ? 'border-purple-500 bg-purple-500/20 text-white'
                  : 'border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-600'
              }`}
            >
              <div className="text-2xl mb-1">{getMoodEmoji(moodOption)}</div>
              <div className="text-sm font-medium">{moodOption}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Time Available */}
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          How much time do you have? <span className="text-red-400">*</span>
        </label>
        <select
          value={timeAvailable}
          onChange={(e) => setTimeAvailable(e.target.value as TimeAvailable)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          required
        >
          <option value="">Select time available</option>
          <option value="Under 30 minutes">⏱️ Under 30 minutes</option>
          <option value="About 1 hour">⏰ About 1 hour</option>
          <option value="Several hours">🕐 Several hours</option>
        </select>
      </div>

      {/* Conditional Fields for Games */}
      {type === 'games' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Platform <span className="text-red-400">*</span>
            </label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value as Platform)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              required
            >
              <option value="">Select platform</option>
              <option value="PC">💻 PC</option>
              <option value="Nintendo Switch">🎮 Nintendo Switch</option>
              <option value="PlayStation">🎮 PlayStation</option>
              <option value="Xbox">🎮 Xbox</option>
              <option value="Mobile">📱 Mobile</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Play Style <span className="text-red-400">*</span>
            </label>
            <select
              value={playStyle}
              onChange={(e) => setPlayStyle(e.target.value as PlayStyle)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              required
            >
              <option value="">Select play style</option>
              <option value="Solo">🧍 Solo</option>
              <option value="Co-op">🤝 Co-op</option>
              <option value="Multiplayer">👥 Multiplayer</option>
              <option value="Either">🎯 Either</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Preferred Genre
            </label>
            <select
              value={preferredGenre}
              onChange={(e) => setPreferredGenre(e.target.value as Genre)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            >
              <option value="No preference">No preference</option>
              <option value="RPG">⚔️ RPG</option>
              <option value="Puzzle">🧩 Puzzle</option>
              <option value="Simulation">🏗️ Simulation</option>
              <option value="Adventure">🗺️ Adventure</option>
              <option value="Action">💥 Action</option>
              <option value="Strategy">🎯 Strategy</option>
            </select>
          </div>
        </>
      )}

      {/* Conditional Fields for Movies */}
      {type === 'movies' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Streaming Platform <span className="text-red-400">*</span>
            </label>
            <select
              value={streamingPlatform}
              onChange={(e) => setStreamingPlatform(e.target.value as StreamingPlatform)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              required
            >
              <option value="">Select streaming platform</option>
              <option value="Netflix">📺 Netflix</option>
              <option value="Amazon Prime">📦 Amazon Prime</option>
              <option value="Disney+">🏰 Disney+</option>
              <option value="HBO Max">🎬 HBO Max</option>
              <option value="Hulu">🟢 Hulu</option>
              <option value="Apple TV+">🍎 Apple TV+</option>
              <option value="Any">✨ Any Platform</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Preferred Genre
            </label>
            <select
              value={preferredMovieGenre}
              onChange={(e) => setPreferredMovieGenre(e.target.value as MovieGenre)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            >
              <option value="No preference">No preference</option>
              <option value="Drama">🎭 Drama</option>
              <option value="Comedy">😂 Comedy</option>
              <option value="Thriller">😱 Thriller</option>
              <option value="Sci-Fi">🚀 Sci-Fi</option>
              <option value="Romance">💕 Romance</option>
              <option value="Documentary">📹 Documentary</option>
              <option value="Animation">🎨 Animation</option>
            </select>
          </div>
        </>
      )}

      {/* Avoid Input */}
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          Things to avoid (optional)
        </label>
        <input
          type="text"
          value={avoidInput}
          onChange={(e) => setAvoidInput(e.target.value)}
          placeholder={type === 'games' ? 'e.g., horror, violence, grinding' : 'e.g., sad endings, violence, slow pacing'}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        />
        <p className="mt-1 text-xs text-gray-400">
          Separate multiple items with commas
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Finding your perfect {type}...
          </span>
        ) : (
          `✨ Get ${type === 'games' ? 'Game' : 'Movie'} Recommendations`
        )}
      </button>
    </form>
  );
}
