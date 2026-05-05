/**
 * FILE: GameComparison.tsx
 * PURPOSE: Compare two game recommendations side-by-side
 * 
 * FEATURES:
 * - Side-by-side comparison layout
 * - Compare mood fit, time fit, platform fit, genre fit, play style fit
 * - Visual score bars
 * - Overall confidence comparison
 * - Highlight better scores
 * 
 * DEPENDENCIES:
 * - types.ts (GameRecommendation)
 * 
 * USED BY:
 * - page.tsx (optional comparison view)
 * 
 * STATUS: Complete
 * DO NOT MODIFY: No - Can be updated for UI improvements
 */

'use client';

import { GameRecommendation } from '@/lib/types';

interface GameComparisonProps {
  game1: GameRecommendation;
  game2: GameRecommendation;
  onClose: () => void;
}

/**
 * GameComparison Component
 * 
 * Displays two games side-by-side for comparison.
 * 
 * COMPARISON METRICS:
 * - Overall confidence
 * - Mood score
 * - Time score
 * - Platform score
 * - Genre score
 * - Play style fit
 * 
 * @param game1 - First game to compare
 * @param game2 - Second game to compare
 * @param onClose - Callback to close comparison
 */
export default function GameComparison({ game1, game2, onClose }: GameComparisonProps) {
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
          <h2 className="text-2xl font-bold text-white">Compare Games</h2>
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
            <h3 className="text-xl font-bold text-white">{game1.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{game1.genreFit}</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{game2.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{game2.genreFit}</p>
          </div>
        </div>

        {/* Comparison Scores */}
        <div className="p-6">
          <ComparisonRow 
            label="Overall Confidence" 
            score1={game1.confidence} 
            score2={game2.confidence} 
          />
          <ComparisonRow 
            label="Mood Match" 
            score1={game1.scores.mood} 
            score2={game2.scores.mood} 
          />
          <ComparisonRow 
            label="Time Fit" 
            score1={game1.scores.time} 
            score2={game2.scores.time} 
          />
          <ComparisonRow 
            label="Platform Fit" 
            score1={game1.scores.platform || 0} 
            score2={game2.scores.platform || 0} 
          />
          <ComparisonRow 
            label="Genre Fit" 
            score1={game1.scores.genre} 
            score2={game2.scores.genre} 
          />
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-4 p-6 border-t border-gray-800">
          <div className="space-y-3">
            <div>
              <div className="text-xs font-medium text-gray-500 uppercase mb-1">Platform</div>
              <div className="text-sm text-white">{game1.platformFit}</div>
            </div>
            <div>
              <div className="text-xs font-medium text-gray-500 uppercase mb-1">Play Style</div>
              <div className="text-sm text-white">{game1.playStyleFit}</div>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <div className="text-xs font-medium text-gray-500 uppercase mb-1">Platform</div>
              <div className="text-sm text-white">{game2.platformFit}</div>
            </div>
            <div>
              <div className="text-xs font-medium text-gray-500 uppercase mb-1">Play Style</div>
              <div className="text-sm text-white">{game2.playStyleFit}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
