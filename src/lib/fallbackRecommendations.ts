import { UserPreferences, GameRecommendation, MovieRecommendation } from './types';
import { gameDataset } from './gameDataset';
import { movieDataset } from './movieDataset';
import { scoreGames, scoreMovies } from './scoring';

export function getFallbackRecommendations(
  preferences: UserPreferences
): GameRecommendation[] | MovieRecommendation[] {
  if (preferences.type === 'movies') {
    return scoreMovies(movieDataset, preferences);
  }
  return scoreGames(gameDataset, preferences);
}
