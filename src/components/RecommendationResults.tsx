'use client';

import { GameRecommendation, MovieRecommendation } from '@/lib/types';
import { Star } from 'lucide-react';

interface RecommendationResultsProps {
  recommendations: (GameRecommendation | MovieRecommendation)[];
  onReset: () => void;
}

export default function RecommendationResults({ recommendations, onReset }: RecommendationResultsProps) {
  const getConfidenceStyle = (confidence: number) => {
    if (confidence >= 90) return 'border-sage-warm/50 bg-sage-warm/10 text-sage-warm';
    if (confidence >= 75) return 'border-amber-warm/50 bg-amber-warm/10 text-amber-warm';
    return 'border-peach-warm/50 bg-peach-warm/10 text-peach-warm';
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif font-bold text-cream-50">Your Picks</h2>
        <p className="text-cream-400 text-sm mt-1 font-serif italic">
          Curated just for your mood
        </p>
      </div>

      {recommendations.map((rec, index) => {
        const isGame = rec.category === 'game';
        const similarItems = isGame
          ? (rec as GameRecommendation).similarGames
          : (rec as MovieRecommendation).similarMovies;

        return (
          <div
            key={rec.id || index}
            className="bg-night-900 rounded-3xl border border-night-700 p-6 hover:border-night-600 transition-all"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 bg-amber-warm/20 text-amber-warm rounded-full font-bold text-sm">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-xl font-serif font-bold text-cream-50">{rec.title}</h3>
                  {'year' in rec && rec.year && (
                    <span className="text-cream-400/60 text-xs">{rec.year}</span>
                  )}
                </div>
              </div>
              <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full border text-sm font-medium ${getConfidenceStyle(rec.confidence)}`}>
                <Star className="w-3 h-3" />
                {rec.confidence}%
              </div>
            </div>

            {/* Why it fits */}
            <p className="text-cream-200 leading-relaxed mb-4 text-sm">{rec.whyItFits}</p>

            {/* Detail chips */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              <div className="bg-night-800 rounded-xl p-3">
                <span className="text-cream-400/60 text-xs uppercase tracking-wider block mb-1">Mood</span>
                <span className="text-cream-200 text-sm">{rec.moodMatch}</span>
              </div>
              <div className="bg-night-800 rounded-xl p-3">
                <span className="text-cream-400/60 text-xs uppercase tracking-wider block mb-1">Time</span>
                <span className="text-cream-200 text-sm">{rec.timeFit}</span>
              </div>
              <div className="bg-night-800 rounded-xl p-3">
                <span className="text-cream-400/60 text-xs uppercase tracking-wider block mb-1">Platform</span>
                <span className="text-cream-200 text-sm">{rec.platformFit}</span>
              </div>
            </div>

            {/* Similar */}
            <div className="pt-3 border-t border-night-700">
              <span className="text-cream-400/60 text-xs uppercase tracking-wider">
                Similar {isGame ? 'games' : 'movies'}
              </span>
              <div className="flex flex-wrap gap-2 mt-2">
                {similarItems.map((item, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-night-800 text-cream-300 rounded-full text-xs border border-night-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      })}

      {/* Try again */}
      <div className="text-center pt-4">
        <button
          onClick={onReset}
          className="px-6 py-3 bg-night-800 text-cream-200 rounded-full border border-night-700 hover:border-amber-warm/40 hover:text-amber-warm transition-all"
        >
          Get new recommendations
        </button>
      </div>
    </div>
  );
}
