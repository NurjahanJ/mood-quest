import { GameRecommendation } from '@/lib/types';
import RecommendationCard from './RecommendationCard';

interface ResultsSectionProps {
  recommendations: GameRecommendation[] | null;
  isLoading: boolean;
  error: string | null;
}

export default function ResultsSection({ recommendations, isLoading, error }: ResultsSectionProps) {
  if (isLoading) {
    return (
      <div className="mt-12 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
        <p className="mt-4 text-gray-300 text-lg">Finding your perfect games...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-12 bg-red-900/20 border border-red-500/50 rounded-xl p-6 text-center">
        <p className="text-red-400 font-medium">{error}</p>
        <p className="text-gray-400 text-sm mt-2">Please try again or adjust your preferences.</p>
      </div>
    );
  }

  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        Your recommended games
      </h2>
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1 max-w-4xl mx-auto">
        {recommendations.map((rec, index) => (
          <RecommendationCard key={index} recommendation={rec} index={index} />
        ))}
      </div>
    </div>
  );
}
