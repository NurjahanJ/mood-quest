import { GameRecommendation, MovieRecommendation } from '@/lib/types';

interface EnhancedRecommendationCardProps {
  recommendation: GameRecommendation | MovieRecommendation;
  index: number;
  type: 'games' | 'movies';
}

export default function EnhancedRecommendationCard({ recommendation, index, type }: EnhancedRecommendationCardProps) {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-400';
    if (confidence >= 75) return 'text-blue-400';
    if (confidence >= 60) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 90) return 'bg-green-500/20 text-green-400 border-green-500/50';
    if (confidence >= 75) return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
    if (confidence >= 60) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
    return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
  };

  const similarItems = 'similarGames' in recommendation ? recommendation.similarGames : recommendation.similarMovies;
  const year = 'year' in recommendation ? recommendation.year : null;

  return (
    <div className="group bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transform hover:-translate-y-1">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 flex-1">
          <span className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full text-white font-bold text-lg shadow-lg">
            {index + 1}
          </span>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all">
              {recommendation.title}
            </h3>
            {year && (
              <p className="text-sm text-gray-400 mt-1">Released: {year}</p>
            )}
          </div>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${getConfidenceBadge(recommendation.confidence)}`}>
          <span className="text-xl font-bold">{recommendation.confidence}</span>
          <span className="text-xs font-medium">%</span>
        </div>
      </div>

      {/* Main Description */}
      <div className="mb-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
        <p className="text-gray-300 leading-relaxed">{recommendation.whyItFits}</p>
      </div>

      {/* Details Grid */}
      <div className="space-y-3 mb-5">
        <div className="flex items-start gap-3 p-3 bg-purple-500/5 rounded-lg border border-purple-500/20">
          <span className="text-purple-400 text-lg">🎭</span>
          <div className="flex-1">
            <span className="text-purple-400 font-medium text-sm block mb-1">Mood Match</span>
            <span className="text-gray-300 text-sm">{recommendation.moodMatch}</span>
          </div>
        </div>
        
        <div className="flex items-start gap-3 p-3 bg-blue-500/5 rounded-lg border border-blue-500/20">
          <span className="text-blue-400 text-lg">⏰</span>
          <div className="flex-1">
            <span className="text-blue-400 font-medium text-sm block mb-1">Time Fit</span>
            <span className="text-gray-300 text-sm">{recommendation.timeFit}</span>
          </div>
        </div>
        
        <div className="flex items-start gap-3 p-3 bg-pink-500/5 rounded-lg border border-pink-500/20">
          <span className="text-pink-400 text-lg">{type === 'games' ? '🎮' : '📺'}</span>
          <div className="flex-1">
            <span className="text-pink-400 font-medium text-sm block mb-1">Platform</span>
            <span className="text-gray-300 text-sm">{recommendation.platformFit}</span>
          </div>
        </div>
      </div>

      {/* Similar Items */}
      <div className="pt-4 border-t border-gray-700">
        <p className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
          <span>✨</span>
          <span>Similar {type === 'games' ? 'games' : 'movies'} you might enjoy:</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {similarItems.map((item, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 bg-gradient-to-r from-gray-700 to-gray-800 text-gray-300 rounded-full text-xs font-medium border border-gray-600 hover:border-purple-500 hover:text-white transition-all cursor-default"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
