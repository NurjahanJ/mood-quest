/**
 * FILE: fallbackRecommendations.ts
 * PURPOSE: Unified fallback recommendation engine for games and movies
 * 
 * FEATURES:
 * - Uses scoring algorithm for intelligent matching
 * - Supports both games and movies
 * - Generates taste profile from user preferences
 * - Returns top 3 recommendations with confidence scores
 * 
 * DEPENDENCIES:
 * - types.ts (UserPreferences, GameRecommendation, MovieRecommendation)
 * - gameDataset.ts (GAME_DATASET)
 * - movieDataset.ts (MOVIE_DATASET)
 * - scoring.ts (scoreGames, scoreMovies)
 * 
 * USED BY:
 * - route.ts (when OpenAI API fails)
 * 
 * STATUS: Complete
 * DO NOT MODIFY: Yes (unless improving algorithm)
 * REASON: Fallback recommendation system
 */

import { UserPreferences, GameRecommendation, MovieRecommendation } from './types';
import { gameDataset } from './gameDataset';
import { movieDataset } from './movieDataset';
import { scoreGames, scoreMovies } from './scoring';

/**
 * Generate taste profile from user preferences
 * 
 * Creates a human-readable description of what the user is looking for
 * Used for logging and debugging
 * 
 * @param preferences - User preferences
 * @returns Taste profile string
 */
export function generateTasteProfile(preferences: UserPreferences): string {
  const { type, mode, mood, timeAvailable } = preferences;
  
  let profile = `Looking for ${type === 'games' ? 'a game' : 'a movie'} that matches a ${mood} mood with ${timeAvailable} available. `;
  
  if (type === 'games') {
    profile += `Prefers ${preferences.platform} platform and ${preferences.playStyle} play. `;
    if (preferences.preferredGenre && preferences.preferredGenre !== 'No preference') {
      profile += `Genre preference: ${preferences.preferredGenre}. `;
    }
  } else {
    if (preferences.preferredMovieGenre && preferences.preferredMovieGenre !== 'No preference') {
      profile += `Genre preference: ${preferences.preferredMovieGenre}. `;
    }
    if (preferences.streamingPlatform && preferences.streamingPlatform !== 'Any') {
      profile += `Streaming on ${preferences.streamingPlatform}. `;
    }
  }
  
  if (preferences.avoid && preferences.avoid.length > 0) {
    profile += `Avoiding: ${preferences.avoid.join(', ')}. `;
  }
  
  profile += `Mode: ${mode}.`;
  
  return profile;
}

/**
 * Get fallback recommendations
 * 
 * PROCESS:
 * 1. Generate taste profile for logging
 * 2. Route to appropriate scoring function
 * 3. Return top 3 scored recommendations
 * 
 * @param preferences - User preferences
 * @returns Array of 3 recommendations (games or movies)
 */
export function getFallbackRecommendations(
  preferences: UserPreferences
): GameRecommendation[] | MovieRecommendation[] {
  // Generate taste profile for debugging
  const tasteProfile = generateTasteProfile(preferences);
  console.log('Fallback recommendations requested:', tasteProfile);
  
  // Route to appropriate recommendation engine
  if (preferences.type === 'games') {
    return scoreGames(gameDataset, preferences);
  } else {
    return scoreMovies(movieDataset, preferences);
  }
}
