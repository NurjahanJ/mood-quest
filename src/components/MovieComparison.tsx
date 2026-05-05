/**
 * FILE: MovieComparison.tsx
 * PURPOSE: Compare two movie recommendations side-by-side
 * 
 * FEATURES:
 * - Side-by-side comparison layout
 * - Compare mood fit, time fit, genre fit, watch style fit
 * - Visual score bars
 * - Overall confidence comparison
 * - Content tone comparison
 * 
 * DEPENDENCIES:
 * - types.ts (MovieRecommendation)
 * 
 * USED BY:
 * - page.tsx (optional comparison view)
 * 
 * STATUS: Complete
 * DO NOT MODIFY: No - Can be updated for UI improvements
 */

'use client';

import { MovieRecommendation } from '@/lib/types';

interface MovieComparisonProps {
  movie1: MovieRecommendation;
  movie2: MovieRecommendation;
  onClose: () => void;
}

/**
 * MovieComparison Component
 * 
 * Displays two movies side-by-side for comparison.
 * 
 * COMPARISON METRICS:
 * - Overall confidence
 * - Mood score
 * - Time score
 * - Genre score
 * - Watch style fit
 * - Content tone
 * 
 * @param movie1 - First movie to compare
 * @param movie2 - Second movie to compare
 * @param onClose - Callback to close comparison
 */
export default function MovieComparison({ movie1, movie2, onClose }: MovieComparisonProps) {
  /**
   * Render a comparison row with scores
   */
  const ComparisonRow = ({ 
    label, 
    score1, 
    score2 
  }: { 
    label: string; 
    score1: number; 
    score2: number;
  }) => {
    const max = Math.max(score1, score2);
    
    return (
      <div className="py-3 border-b border-gray-800 last:border-0">
        <div className="text-sm font-medium text-gray-400 mb-2">{label}</div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-800 rounded-full h-2 overflow-hidden">
              <div 
                className={`h-full ${score1 === max && score1 !== score2 ? 'bg-green-500' : 'bg-gray-600'}`}
                style={{ width: `${score1}%` }}
              />
            </div>
            <span className={`text-sm font-bold ${score1 === max && score1 !== score2 ? 'text-green-400' : 'text-gray-400'}`}>
              {score1}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-800 rounded-full h-2 overflow-hidden">
              <div 
                className={`h-full ${score2 === max && score1 !== score2 ? 'bg-green-500' : 'bg-gray-600'}`}
                style={{ width: `${score2}%` }}
              />
            </div>
            <span className={`text-sm font-bold ${score2 === max && score1 !== score2 ? 'text-green-400' : 'text-gray-400'}`}>
              {score2}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg border border-gray-800 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900 border-b border-gray-800 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Compare Movies</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Titles */}
        <div className="grid grid-cols-2 gap-4 p-6 border-b border-gray-800">
          <div>
            <h3 className="text-xl font-bold text-white">{movie1.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{movie1.genreFit}</p>
            {movie1.year && <p className="text-xs text-gray-600 mt-1">{movie1.year}</p>}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{movie2.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{movie2.genreFit}</p>
            {movie2.year && <p className="text-xs text-gray-600 mt-1">{movie2.year}</p>}
          </div>
        </div>

        {/* Comparison Scores */}
        <div className="p-6">
          <ComparisonRow 
            label="Overall Confidence" 
            score1={movie1.confidence} 
            score2={movie2.confidence} 
          />
          <ComparisonRow 
            label="Mood Match" 
            score1={movie1.scores.mood} 
            score2={movie2.scores.mood} 
          />
          <ComparisonRow 
            label="Time Fit" 
            score1={movie1.scores.time} 
            score2={movie2.scores.time} 
          />
          <ComparisonRow 
            label="Genre Fit" 
            score1={movie1.scores.genre} 
            score2={movie2.scores.genre} 
          />
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-4 p-6 border-t border-gray-800">
          <div className="space-y-3">
            <div>
              <div className="text-xs font-medium text-gray-500 uppercase mb-1">Watch Style</div>
              <div className="text-sm text-white">{movie1.watchStyleFit}</div>
            </div>
            <div>
              <div className="text-xs font-medium text-gray-500 uppercase mb-1">Content Tone</div>
              <div className="text-sm text-white">{movie1.contentTone}</div>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <div className="text-xs font-medium text-gray-500 uppercase mb-1">Watch Style</div>
              <div className="text-sm text-white">{movie2.watchStyleFit}</div>
            </div>
            <div>
              <div className="text-xs font-medium text-gray-500 uppercase mb-1">Content Tone</div>
              <div className="text-sm text-white">{movie2.contentTone}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
