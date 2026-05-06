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

import Lumi from './Lumi';
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
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-2 border-night-700 border-t-amber-warm mb-6"></div>
        <p className="text-cream-300 text-lg font-serif italic">Stirring up something good…</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-4">
        <Lumi message="Something's off — let's try again." size="sm" />
        <div className="bg-rose-warm/10 border border-rose-warm/30 rounded-2xl p-6 text-center">
          <p className="text-rose-warm font-medium">{error}</p>
          <p className="text-cream-400 text-sm mt-2">Adjust your preferences or give it another go.</p>
        </div>
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
        <Lumi message="Here's what I found for you tonight." size="sm" />
        <h2 className="text-3xl font-serif font-bold text-cream-50 mt-6 mb-2">
          Tonight&apos;s picks, served warm
        </h2>
        <p className="text-cream-400">Based on your mood and preferences</p>
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
            className="px-6 py-3 bg-night-800 text-cream-200 rounded-full border border-night-700 hover:border-amber-warm/40 hover:text-amber-warm transition-all"
          >
            Show me different ones
          </button>
        </div>
      )}
    </div>
  );
}
