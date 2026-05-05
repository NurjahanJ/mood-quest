'use client';



import { useState } from 'react';

import PreferenceForm from '@/components/PreferenceForm';

import ResultsSection from '@/components/ResultsSection';

import { UserPreferences, GameRecommendation } from '@/lib/types';



export default function Home() {

  const [recommendations, setRecommendations] = useState<GameRecommendation[] | null>(null);

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

    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">

      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-12">

          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">

            MoodQuest

          </h1>

          <p className="text-2xl text-gray-300 mb-2">

            Find your next game based on your mood.

          </p>

          <p className="text-gray-400 max-w-2xl mx-auto">

            MoodQuest recommends games using your mood, time, platform, and play style, then explains why each pick fits.

          </p>

        </div>



        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700 mb-8">

          <PreferenceForm onSubmit={handleSubmit} isLoading={isLoading} />

        </div>



        <ResultsSection 

          recommendations={recommendations} 

          isLoading={isLoading} 

          error={error} 

        />

      </div>



      <footer className="mt-16 text-center text-gray-500 text-sm">

        <p>Built with Next.js, TypeScript, and OpenAI</p>

      </footer>

    </main>

  );

}

