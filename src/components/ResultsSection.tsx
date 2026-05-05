/**
 * FILE: ResultsSection.tsx
 * PURPOSE: Container for displaying recommendation results
 * 
 * FEATURES:
 * - Displays 3 recommendation cards
 * - Shows loading state with spinner
 * - Shows error state with message
 * - Shows empty state when no recommendations
 * - Includes "Refine Recommendations" button
 * 
 * DEPENDENCIES:
 * - types.ts (Recommendation)
 * - RecommendationCard.tsx
 * 
 * USED BY:
 * - page.tsx (main application)
 * 
 * STATUS: Complete
 * DO NOT MODIFY: No - Can be updated for UX improvements
 */

'use client';

import RecommendationCard from './RecommendationCard';
import { GameRecommendation, MovieRecommendation } from '@/lib/types';

interface ResultsSectionProps {
  recommendations: (GameRecommendation | MovieRecommendation)[] | null;
  isLoading: boolean;
  error: string | null;
  onLike: (id: string) => void;
  onDislike: (id: string) => void;
  onSave: (rec: GameRecommendation | MovieRecommendation) => void;
  onRefine?: () => void;
}

export default function ResultsSection({
  recommendations,
  isLoading,
  error,
  onLike,
  onDislike,
  onSave,
  onRefine
}: ResultsSectionProps) {
  // Loading state
  if (isLoading) {
    return (
      <div className="text-center py-16">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-2 border-gray-700 border-t-white mb-4"></div>
        <p className="text-gray-400 text-lg">Finding your perfect recommendations...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-red-900/10 border border-red-800 rounded-lg p-6 text-center">
        <p className="text-red-400 font-medium">{error}</p>
        <p className="text-gray-500 text-sm mt-2">Please try again or adjust your preferences.</p>
      </div>
    );
  }

  // Empty state
  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          Your Recommended Picks
        </h2>
        <p className="text-gray-500">Based on your preferences</p>
      </div>

      <div className="space-y-6">
        {recommendations.map((rec, index) => (
          <RecommendationCard
            key={rec.id}
            recommendation={rec}
            index={index}
            onLike={onLike}
            onDislike={onDislike}
            onSave={onSave}
          />
        ))}
      </div>

      {onRefine && (
        <div className="mt-8 text-center">
          <button
            onClick={onRefine}
            className="px-6 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 hover:border-white transition-all"
          >
            Refine Recommendations
          </button>
        </div>
      )}
    </div>
  );
}
