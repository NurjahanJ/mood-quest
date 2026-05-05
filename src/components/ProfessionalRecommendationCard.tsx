import { GameRecommendation, MovieRecommendation } from '@/lib/types';

interface ProfessionalRecommendationCardProps {
  recommendation: GameRecommendation | MovieRecommendation;
  index: number;
  type: 'games' | 'movies';
}

export default function ProfessionalRecommendationCard({ recommendation, index, type }: ProfessionalRecommendationCardProps) {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400';
    if (confidence >= 75) return 'border-blue-500/50 bg-blue-500/10 text-blue-400';
    if (confidence >= 60) return 'border-amber-500/50 bg-amber-500/10 text-amber-400';
    return 'border-orange-500/50 bg-orange-500/10 text-orange-400';
  };

  const similarItems = 'similarGames' in recommendation ? recommendation.similarGames : recommendation.similarMovies;
  const year = 'year' in recommendation ? recommendation.year : null;

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 hover:border-gray-700 transition-all duration-300 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                #{index + 1}
              </span>
              <h3 className="text-2xl font-semibold text-white">
                {recommendation.title}
              </h3>
            </div>
            {year && (
              <p className="text-sm text-gray-500">{year}</p>
            )}
          </div>
          <div className={`px-4 py-2 rounded-lg border ${getConfidenceColor(recommendation.confidence)}`}>
            <div className="text-center">
              <div className="text-2xl font-bold">{recommendation.confidence}</div>
              <div className="text-xs uppercase tracking-wider opacity-75">Match</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Why It Fits */}
        <div>
          <p className="text-gray-300 leading-relaxed">
            {recommendation.whyItFits}
          </p>
        </div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Mood Match
            </div>
            <div className="text-sm text-gray-300">
              {recommendation.moodMatch}
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Time Fit
            </div>
            <div className="text-sm text-gray-300">
              {recommendation.timeFit}
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Platform
            </div>
            <div className="text-sm text-gray-300">
              {recommendation.platformFit}
            </div>
          </div>
        </div>

        {/* Similar Items */}
        <div className="pt-4 border-t border-gray-800">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
            Similar {type === 'games' ? 'Games' : 'Movies'}
          </div>
          <div className="flex flex-wrap gap-2">
            {similarItems.map((item, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 bg-gray-800 text-gray-400 rounded text-sm border border-gray-700 hover:border-gray-600 hover:text-gray-300 transition-colors"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
