'use client';

import { useState } from 'react';
import ProfessionalPreferenceForm from '@/components/ProfessionalPreferenceForm';
import ProfessionalRecommendationCard from '@/components/ProfessionalRecommendationCard';
import { UserPreferences, GameRecommendation, MovieRecommendation, RecommendationType } from '@/lib/types';

export default function Home() {
  const [recommendations, setRecommendations] = useState<(GameRecommendation | MovieRecommendation)[] | null>(null);
  const [recommendationType, setRecommendationType] = useState<RecommendationType>('games');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (preferences: UserPreferences) => {
    setIsLoading(true);
    setError(null);
    setRecommendations(null);

    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferences),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get recommendations');
      }

      const data = await response.json();
      setRecommendations(data.recommendations);
      setRecommendationType(data.type);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            MoodQuest
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            Intelligent recommendations for {recommendationType === 'games' ? 'games' : 'movies'} based on your current mood and preferences.
          </p>
        </div>

        {/* Form Section */}
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-8 mb-16">
          <ProfessionalPreferenceForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>

        {/* Results Section */}
        {isLoading && (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-2 border-gray-700 border-t-white mb-4"></div>
            <p className="text-gray-400 text-lg">Analyzing preferences...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-900/10 border border-red-800 rounded-lg p-6 text-center">
            <p className="text-red-400 font-medium">{error}</p>
            <p className="text-gray-500 text-sm mt-2">Please try again or adjust your preferences.</p>
          </div>
        )}

        {!isLoading && !error && recommendations && recommendations.length > 0 && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                Recommended {recommendationType === 'games' ? 'Games' : 'Movies'}
              </h2>
              <p className="text-gray-500">Based on your preferences</p>
            </div>
            <div className="space-y-6">
              {recommendations.map((rec, index) => (
                <ProfessionalRecommendationCard 
                  key={index} 
                  recommendation={rec} 
                  index={index}
                  type={recommendationType}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-24 text-center text-gray-600 text-sm">
        <p>Powered by OpenAI • Built with Next.js & TypeScript</p>
      </footer>
    </main>
  );
}
