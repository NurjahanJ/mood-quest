'use client';

import { useState } from 'react';
import { UserPreferences, Mood, TimeAvailable, Platform, PlayStyle, Genre } from '@/lib/types';

interface PreferenceFormProps {
  onSubmit: (preferences: UserPreferences) => void;
  isLoading: boolean;
}

export default function PreferenceForm({ onSubmit, isLoading }: PreferenceFormProps) {
  const [mood, setMood] = useState<Mood | ''>('');
  const [timeAvailable, setTimeAvailable] = useState<TimeAvailable | ''>('');
  const [platform, setPlatform] = useState<Platform | ''>('');
  const [playStyle, setPlayStyle] = useState<PlayStyle | ''>('');
  const [preferredGenre, setPreferredGenre] = useState<Genre>('No preference');
  const [avoidInput, setAvoidInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!mood || !timeAvailable || !platform || !playStyle) {
      alert('Please fill in all required fields');
      return;
    }

    const avoid = avoidInput
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0);

    const preferences: UserPreferences = {
      mood,
      timeAvailable,
      platform,
      playStyle,
      preferredGenre: preferredGenre === 'No preference' ? undefined : preferredGenre,
      avoid: avoid.length > 0 ? avoid : undefined,
    };

    onSubmit(preferences);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          Mood <span className="text-red-400">*</span>
        </label>
        <select
          value={mood}
          onChange={(e) => setMood(e.target.value as Mood)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          required
        >
          <option value="">Select your mood</option>
          <option value="Relaxing">Relaxing</option>
          <option value="Cozy">Cozy</option>
          <option value="Competitive">Competitive</option>
          <option value="Story-driven">Story-driven</option>
          <option value="Strategic">Strategic</option>
          <option value="Chaotic">Chaotic</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          Time Available <span className="text-red-400">*</span>
        </label>
        <select
          value={timeAvailable}
          onChange={(e) => setTimeAvailable(e.target.value as TimeAvailable)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          required
        >
          <option value="">Select time available</option>
          <option value="Under 30 minutes">Under 30 minutes</option>
          <option value="About 1 hour">About 1 hour</option>
          <option value="Several hours">Several hours</option>
        </select>
      </div>

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
          <option value="PC">PC</option>
          <option value="Nintendo Switch">Nintendo Switch</option>
          <option value="PlayStation">PlayStation</option>
          <option value="Xbox">Xbox</option>
          <option value="Mobile">Mobile</option>
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
          <option value="Solo">Solo</option>
          <option value="Co-op">Co-op</option>
          <option value="Multiplayer">Multiplayer</option>
          <option value="Either">Either</option>
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
          <option value="RPG">RPG</option>
          <option value="Puzzle">Puzzle</option>
          <option value="Simulation">Simulation</option>
          <option value="Adventure">Adventure</option>
          <option value="Action">Action</option>
          <option value="Strategy">Strategy</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          Avoid (optional)
        </label>
        <input
          type="text"
          value={avoidInput}
          onChange={(e) => setAvoidInput(e.target.value)}
          placeholder="e.g., horror, violence, grinding (comma-separated)"
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        />
        <p className="mt-1 text-xs text-gray-400">
          Separate multiple items with commas
        </p>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Finding your perfect games...' : 'Get Recommendations'}
      </button>
    </form>
  );
}
