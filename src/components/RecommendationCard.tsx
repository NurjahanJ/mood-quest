import { GameRecommendation } from '@/lib/types';

interface RecommendationCardProps {
  recommendation: GameRecommendation;
  index: number;
}

export default function RecommendationCard({ recommendation, index }: RecommendationCardProps) {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-400';
    if (confidence >= 75) return 'text-blue-400';
    if (confidence >= 60) return 'text-yellow-400';
    return 'text-orange-400';
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/20">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 bg-purple-600 rounded-full text-white font-bold text-sm">
            {index + 1}
          </span>
          <h3 className="text-xl font-bold text-white">{recommendation.title}</h3>
        </div>
        <div className="flex items-center gap-1">
          <span className={`text-2xl font-bold ${getConfidenceColor(recommendation.confidence)}`}>
            {recommendation.confidence}
          </span>
          <span className="text-gray-400 text-sm">%</span>
        </div>
      </div>

      <p className="text-gray-300 mb-4 leading-relaxed">{recommendation.whyItFits}</p>

      <div className="space-y-3 mb-4">
        <div className="flex items-start gap-2">
          <span className="text-purple-400 font-medium text-sm min-w-[100px]">Mood Match:</span>
          <span className="text-gray-300 text-sm">{recommendation.moodMatch}</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-purple-400 font-medium text-sm min-w-[100px]">Time Fit:</span>
          <span className="text-gray-300 text-sm">{recommendation.timeFit}</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-purple-400 font-medium text-sm min-w-[100px]">Platform:</span>
          <span className="text-gray-300 text-sm">{recommendation.platformFit}</span>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-700">
        <p className="text-sm font-medium text-gray-400 mb-2">Similar games you might enjoy:</p>
        <div className="flex flex-wrap gap-2">
          {recommendation.similarGames.map((game, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs"
            >
              {game}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
