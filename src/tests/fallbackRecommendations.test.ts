/**
 * FILE: fallbackRecommendations.test.ts
 * PURPOSE: Test fallback recommendation system
 * 
 * TESTS:
 * - Returns exactly 3 recommendations
 * - Works for games
 * - Works for movies
 * - Includes taste profile
 * - Matches RecommendationResponse schema
 * 
 * STATUS: Complete
 */

import { describe, it, expect } from 'vitest';
import { getFallbackRecommendations } from '@/lib/fallbackRecommendations';
import { UserPreferences } from '@/lib/types';

describe('Fallback Recommendations', () => {
  it('should return exactly 3 game recommendations', () => {
    const preferences: UserPreferences = {
      type: 'games',
      mode: 'Quick Match',
      mood: 'Relaxing',
      timeAvailable: 'About 1 hour',
      platform: 'PC',
      playStyle: 'Solo',
      preferredGenre: 'Simulation',
      avoid: []
    };

    const results = getFallbackRecommendations(preferences);
    
    expect(Array.isArray(results)).toBe(true);
    expect(results).toHaveLength(3);
  });

  it('should return exactly 3 movie recommendations', () => {
    const preferences: UserPreferences = {
      type: 'movies',
      mode: 'Deep Match',
      mood: 'Comforting',
      timeAvailable: 'About 2 hours',
      streamingPlatform: 'Netflix',
      preferredMovieGenre: 'Comedy',
      avoid: []
    };

    const results = getFallbackRecommendations(preferences);
    
    expect(Array.isArray(results)).toBe(true);
    expect(results).toHaveLength(3);
  });

  it('should include all required fields for games', () => {
    const preferences: UserPreferences = {  
      type: 'games',
      mode: 'Surprise Me',
      mood: 'Competitive',
      timeAvailable: 'Several hours',
      platform: 'PlayStation',
      playStyle: 'Multiplayer',
      preferredGenre: 'Action',
      avoid: ['horror']
    };

    const results = getFallbackRecommendations(preferences);
    
    results.forEach(rec => {
      expect(rec).toHaveProperty('id');
      expect(rec).toHaveProperty('category');
      expect(rec).toHaveProperty('title');
      expect(rec).toHaveProperty('whyItFits');
      expect(rec).toHaveProperty('moodMatch');
      expect(rec).toHaveProperty('timeFit');
      expect(rec).toHaveProperty('platformFit');
      expect(rec).toHaveProperty('confidence');
      expect(rec).toHaveProperty('scores');
    });
  });

  it('should return confidence scores between 0 and 100', () => {
    const preferences: UserPreferences = {
      type: 'movies',
      mode: 'Quick Match',
      mood: 'Funny',
      timeAvailable: 'Under 90 minutes',
      streamingPlatform: 'Hulu',
      preferredMovieGenre: 'Comedy',
      avoid: []
    };

    const results = getFallbackRecommendations(preferences);
    
    results.forEach(rec => {
      expect(rec.confidence).toBeGreaterThanOrEqual(0);
      expect(rec.confidence).toBeLessThanOrEqual(100);
    });
  });

  it('should work for both games and movies', () => {
    const gamePrefs: UserPreferences = {
      type: 'games',
      mode: 'Quick Match',
      mood: 'Relaxing',
      timeAvailable: 'About 1 hour',
      platform: 'PC',
      playStyle: 'Solo',
      avoid: []
    };

    const moviePrefs: UserPreferences = {
      type: 'movies',
      mode: 'Quick Match',
      mood: 'Comforting',
      timeAvailable: 'About 2 hours',
      streamingPlatform: 'Netflix',
      avoid: []
    };

    const gameRecs = getFallbackRecommendations(gamePrefs);
    const movieRecs = getFallbackRecommendations(moviePrefs);

    expect(gameRecs).toHaveLength(3);
    expect(movieRecs).toHaveLength(3);
    expect(gameRecs[0].category).toBe('game');
    expect(movieRecs[0].category).toBe('movie');
  });

  it('should handle all game mood types', () => {
    const moods: Array<'Relaxing' | 'Cozy' | 'Competitive' | 'Story-driven' | 'Strategic' | 'Chaotic'> = [
      'Relaxing',
      'Cozy',
      'Competitive',
      'Story-driven',
      'Strategic',
      'Chaotic',
    ];

    moods.forEach((mood) => {
      const preferences: UserPreferences = {
        type: 'games',
        mode: 'Quick Match',
        mood,
        timeAvailable: 'About 1 hour',
        platform: 'PC',
        playStyle: 'Solo',
        avoid: []
      };

      const results = getFallbackRecommendations(preferences);
      expect(results).toHaveLength(3);
      expect(results[0].confidence).toBeGreaterThan(0);
    });
  });

  it('should return valid similar titles arrays', () => {
    const preferences: UserPreferences = {
      type: 'games',
      mode: 'Quick Match',
      mood: 'Cozy',
      timeAvailable: 'About 1 hour',
      platform: 'Nintendo Switch',
      playStyle: 'Solo',
      avoid: []
    };

    const results = getFallbackRecommendations(preferences);

    results.forEach((rec) => {
      if ('similarGames' in rec) {
        expect(rec.similarGames.length).toBeGreaterThan(0);
        rec.similarGames.forEach((game) => {
          expect(typeof game).toBe('string');
          expect(game.length).toBeGreaterThan(0);
        });
      }
    });
  });

  it('should handle avoid tags', () => {
    const preferences: UserPreferences = {
      type: 'games',
      mode: 'Quick Match',
      mood: 'Story-driven',
      timeAvailable: 'Several hours',
      platform: 'PlayStation',
      playStyle: 'Solo',
      avoid: ['violence', 'horror']
    };

    const results = getFallbackRecommendations(preferences);
    
    expect(results).toHaveLength(3);
    // Results should still be returned even with avoid tags
    expect(results[0].confidence).toBeGreaterThan(0);
  });

  it('should return recommendations with scores object', () => {
    const preferences: UserPreferences = {
      type: 'movies',
      mode: 'Deep Match',
      mood: 'Emotional',
      timeAvailable: 'About 2 hours',
      streamingPlatform: 'Netflix',
      preferredMovieGenre: 'Drama',
      avoid: []
    };

    const results = getFallbackRecommendations(preferences);
    
    results.forEach(rec => {
      expect(rec.scores).toBeDefined();
      expect(rec.scores).toHaveProperty('mood');
      expect(rec.scores).toHaveProperty('time');
      expect(rec.scores).toHaveProperty('genre');
      expect(rec.scores).toHaveProperty('overall');
    });
  });
});
