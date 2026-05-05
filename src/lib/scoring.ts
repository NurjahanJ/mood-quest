/**
 * FILE: scoring.ts
 * PURPOSE: Local recommendation scoring algorithm
 * 
 * ALGORITHM:
 * 1. Calculate individual scores (mood, time, platform, genre)
 * 2. Apply mode-specific weights
 * 3. Apply penalties for avoid tags
 * 4. Calculate overall confidence score
 * 5. Return top 3 recommendations
 * 
 * MODES:
 * - Quick Match: Prioritize time and platform
 * - Deep Match: Prioritize mood and genre
 * - Surprise Me: Add randomness to scores
 * 
 * DEPENDENCIES:
 * - types.ts (UserPreferences, GameRecommendation, MovieRecommendation)
 * - gameDataset.ts (GameDataItem)
 * - movieDataset.ts (MovieDataItem)
 * 
 * USED BY:
 * - fallbackRecommendations.ts (for generating fallback recommendations)
 * - Tests (for validating scoring logic)
 * 
 * STATUS: Complete
 * DO NOT MODIFY: Yes (unless fixing bugs)
 * REASON: Core recommendation logic
 */

import { UserPreferences, GameRecommendation, MovieRecommendation } from './types';
import { GameDataItem } from './gameDataset';
import { MovieDataItem } from './movieDataset';

/**
 * Weight configurations for each mode
 * 
 * These determine how much each factor contributes to the final score
 */
const WEIGHTS = {
  'Quick Match': { mood: 0.3, time: 0.4, platform: 0.2, genre: 0.1 },
  'Deep Match': { mood: 0.4, time: 0.2, platform: 0.2, genre: 0.2 },
  'Surprise Me': { mood: 0.25, time: 0.25, platform: 0.25, genre: 0.25 }
};

/**
 * Calculate mood score
 * 
 * @param itemMoods - Moods associated with the item
 * @param userMood - User's selected mood
 * @returns Score from 0-100
 */
function calculateMoodScore(itemMoods: string[], userMood: string): number {
  if (itemMoods.includes(userMood)) return 100;
  // Partial match for related moods
  if (itemMoods.length > 0) return 50;
  return 30;
}

/**
 * Calculate time score
 * 
 * @param itemTimes - Time fits for the item
 * @param userTime - User's available time
 * @returns Score from 0-100
 */
function calculateTimeScore(itemTimes: string[], userTime: string): number {
  if (itemTimes.includes(userTime)) return 100;
  // Compatible time slots
  if (itemTimes.length > 0) return 60;
  return 20;
}

/**
 * Calculate platform score (for games)
 * 
 * @param platforms - Available platforms
 * @param userPlatform - User's platform
 * @returns Score from 0-100
 */
function calculatePlatformScore(platforms: string[], userPlatform: string): number {
  if (platforms.includes(userPlatform)) return 100;
  // Cross-platform availability
  if (platforms.length >= 3) return 50;
  return 0;
}

/**
 * Calculate genre score
 * 
 * @param genres - Item genres
 * @param userGenre - User's preferred genre
 * @returns Score from 0-100
 */
function calculateGenreScore(genres: string[], userGenre?: string): number {
  if (!userGenre || userGenre === 'No preference') return 80;
  if (genres.includes(userGenre)) return 100;
  // Related genre
  if (genres.length > 0) return 60;
  return 40;
}

/**
 * Calculate avoid penalty
 * 
 * @param avoidTags - Item's avoid tags
 * @param userAvoid - User's avoid list
 * @returns Penalty from 0-100
 */
function calculateAvoidPenalty(avoidTags: string[], userAvoid: string[]): number {
  if (!userAvoid || userAvoid.length === 0) return 0;
  
  let penalty = 0;
  for (const tag of userAvoid) {
    if (avoidTags.some(itemTag => itemTag.toLowerCase().includes(tag.toLowerCase()))) {
      penalty += 50;
    }
  }
  
  return Math.min(penalty, 100);
}

/**
 * Score games based on user preferences
 * 
 * PROCESS:
 * 1. Calculate individual scores for each game
 * 2. Apply mode-specific weights
 * 3. Apply avoid penalties
 * 4. Sort by final score
 * 5. Return top 3 with full recommendation data
 * 
 * @param games - Array of game data items
 * @param prefs - User preferences
 * @returns Array of top 3 game recommendations
 */
export function scoreGames(games: GameDataItem[], prefs: UserPreferences): GameRecommendation[] {
  const mode = prefs.mode || 'Quick Match';
  const weights = WEIGHTS[mode as keyof typeof WEIGHTS] || WEIGHTS['Quick Match'];
  
  // Score each game
  const scored = games.map(game => {
    const moodScore = calculateMoodScore(game.moods, prefs.mood);
    const timeScore = calculateTimeScore(game.timeFits, prefs.timeAvailable);
    const platformScore = calculatePlatformScore(game.platforms, prefs.platform || '');
    const genreScore = calculateGenreScore(game.genres, prefs.preferredGenre);
    
    // Calculate weighted score
    let rawScore = 
      (moodScore * weights.mood) +
      (timeScore * weights.time) +
      (platformScore * weights.platform) +
      (genreScore * weights.genre);
    
    // Apply avoid penalty
    const avoidPenalty = calculateAvoidPenalty(game.avoidTags, prefs.avoid || []);
    const finalScore = Math.max(0, rawScore - avoidPenalty);
    
    // Add randomness for Surprise Me mode
    const confidence = mode === 'Surprise Me' 
      ? Math.min(100, Math.max(0, finalScore + (Math.random() * 20 - 10)))
      : finalScore;
    
    return {
      game,
      confidence: Math.round(confidence),
      scores: {
        mood: Math.round(moodScore),
        time: Math.round(timeScore),
        platform: Math.round(platformScore),
        genre: Math.round(genreScore),
        overall: Math.round(finalScore)
      }
    };
  });
  
  // Sort by confidence and take top 3
  const top3 = scored
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 3);
  
  // Convert to GameRecommendation format
  return top3.map(item => ({
    id: item.game.id,
    category: 'game',
    title: item.game.title,
    whyItFits: `This ${item.game.genres.join('/')} game matches your ${prefs.mood} mood and fits your ${prefs.timeAvailable} timeframe.`,
    moodMatch: `Matches your ${prefs.mood} mood`,
    timeFit: `Perfect for ${prefs.timeAvailable}`,
    platformFit: item.game.platforms.includes(prefs.platform || '') 
      ? `Available on ${prefs.platform}` 
      : `Available on ${item.game.platforms.join(', ')}`,
    playStyleFit: item.game.playStyles.includes(prefs.playStyle || '')
      ? `Supports ${prefs.playStyle} play`
      : `Supports ${item.game.playStyles.join(', ')}`,
    genreFit: item.game.genres.join(', '),
    similarGames: item.game.similarTitles,
    confidence: item.confidence,
    scores: item.scores
  }));
}

/**
 * Score movies based on user preferences
 * 
 * PROCESS:
 * 1. Calculate individual scores for each movie
 * 2. Apply mode-specific weights
 * 3. Apply avoid penalties
 * 4. Sort by final score
 * 5. Return top 3 with full recommendation data
 * 
 * @param movies - Array of movie data items
 * @param prefs - User preferences
 * @returns Array of top 3 movie recommendations
 */
export function scoreMovies(movies: MovieDataItem[], prefs: UserPreferences): MovieRecommendation[] {
  const mode = prefs.mode || 'Quick Match';
  const weights = WEIGHTS[mode as keyof typeof WEIGHTS] || WEIGHTS['Quick Match'];
  
  // Score each movie
  const scored = movies.map(movie => {
    const moodScore = calculateMoodScore(movie.moods, prefs.mood);
    const timeScore = calculateTimeScore(movie.timeFits, prefs.timeAvailable);
    const genreScore = calculateGenreScore(movie.genres, prefs.preferredMovieGenre);
    
    // Calculate weighted score (no platform for movies)
    let rawScore = 
      (moodScore * (weights.mood + weights.platform)) + // Combine mood and platform weight
      (timeScore * weights.time) +
      (genreScore * weights.genre);
    
    // Apply avoid penalty
    const avoidPenalty = calculateAvoidPenalty(movie.avoidTags, prefs.avoid || []);
    const finalScore = Math.max(0, rawScore - avoidPenalty);
    
    // Add randomness for Surprise Me mode
    const confidence = mode === 'Surprise Me' 
      ? Math.min(100, Math.max(0, finalScore + (Math.random() * 20 - 10)))
      : finalScore;
    
    return {
      movie,
      confidence: Math.round(confidence),
      scores: {
        mood: Math.round(moodScore),
        time: Math.round(timeScore),
        genre: Math.round(genreScore),
        overall: Math.round(finalScore)
      }
    };
  });
  
  // Sort by confidence and take top 3
  const top3 = scored
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 3);
  
  // Convert to MovieRecommendation format
  return top3.map(item => ({
    id: item.movie.id,
    category: 'movie',
    title: item.movie.title,
    year: item.movie.year,
    whyItFits: `This ${item.movie.genres.join('/')} film matches your ${prefs.mood} mood and fits your ${prefs.timeAvailable} preference.`,
    moodMatch: `Matches your ${prefs.mood} mood`,
    timeFit: `Runtime fits ${prefs.timeAvailable}`,
    platformFit: prefs.streamingPlatform === 'Any' 
      ? 'Available on multiple platforms' 
      : `Check ${prefs.streamingPlatform} availability`,
    watchStyleFit: item.movie.watchStyles.join(', '),
    contentTone: item.movie.contentTone,
    genreFit: item.movie.genres.join(', '),
    similarMovies: item.movie.similarTitles,
    confidence: item.confidence,
    scores: item.scores
  }));
}
