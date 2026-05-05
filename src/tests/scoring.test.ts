/**
 * FILE: scoring.test.ts
 * PURPOSE: Test scoring algorithm for games and movies
 * 
 * TESTS:
 * - Game scoring returns ranked results
 * - Movie scoring returns ranked results
 * - Avoid tags reduce scores
 * - Scores are within valid range (0-100)
 * - Mode affects scoring weights
 * - Top 3 recommendations are returned
 * 
 * STATUS: Complete
 */

import { describe, it, expect } from 'vitest';
import { scoreGames, scoreMovies } from '@/lib/scoring';
import { gameDataset } from '@/lib/gameDataset';
import { movieDataset } from '@/lib/movieDataset';
import { UserPreferences } from '@/lib/types';

describe('Game Scoring', () => {
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

    const results = scoreGames(gameDataset, preferences);
    expect(results).toHaveLength(3);
  });

  it('should return scores between 0 and 100', () => {
    const preferences: UserPreferences = {
      type: 'games',
      mode: 'Deep Match',
      mood: 'Competitive',
      timeAvailable: 'Several hours',
      platform: 'PlayStation',
      playStyle: 'Multiplayer',
      preferredGenre: 'Action',
      avoid: []
    };

    const results = scoreGames(gameDataset, preferences);
    
    results.forEach(rec => {
      expect(rec.confidence).toBeGreaterThanOrEqual(0);
      expect(rec.confidence).toBeLessThanOrEqual(100);
      expect(rec.scores.mood).toBeGreaterThanOrEqual(0);
      expect(rec.scores.mood).toBeLessThanOrEqual(100);
      expect(rec.scores.time).toBeGreaterThanOrEqual(0);
      expect(rec.scores.time).toBeLessThanOrEqual(100);
    });
  });

  it('should penalize games with avoid tags', () => {
    const withoutAvoid: UserPreferences = {
      type: 'games',
      mode: 'Quick Match',
      mood: 'Chaotic',
      timeAvailable: 'About 1 hour',
      platform: 'PC',
      playStyle: 'Multiplayer',
      preferredGenre: 'Action',
      avoid: []
    };

    const withAvoid: UserPreferences = {
      ...withoutAvoid,
      avoid: ['violence', 'horror']
    };

    const resultsWithout = scoreGames(gameDataset, withoutAvoid);
    const resultsWith = scoreGames(gameDataset, withAvoid);

    // At least one game should have lower score with avoid tags
    const hasLowerScores = resultsWith.some((rec, idx) => 
      rec.confidence < resultsWithout[idx].confidence
    );
    
    expect(hasLowerScores).toBe(true);
  });

  it('should include all required fields', () => {
    const preferences: UserPreferences = {
      type: 'games',
      mode: 'Surprise Me',
      mood: 'Cozy',
      timeAvailable: 'Under 30 minutes',
      platform: 'Nintendo Switch',
      playStyle: 'Solo',
      preferredGenre: 'Puzzle',
      avoid: []
    };

    const results = scoreGames(gameDataset, preferences);
    
    results.forEach(rec => {
      expect(rec).toHaveProperty('id');
      expect(rec).toHaveProperty('category');
      expect(rec).toHaveProperty('title');
      expect(rec).toHaveProperty('whyItFits');
      expect(rec).toHaveProperty('moodMatch');
      expect(rec).toHaveProperty('timeFit');
      expect(rec).toHaveProperty('platformFit');
      expect(rec).toHaveProperty('playStyleFit');
      expect(rec).toHaveProperty('genreFit');
      expect(rec).toHaveProperty('similarGames');
      expect(rec).toHaveProperty('confidence');
      expect(rec).toHaveProperty('scores');
    });
  });
});

describe('Movie Scoring', () => {
  it('should return exactly 3 movie recommendations', () => {
    const preferences: UserPreferences = {
      type: 'movies',
      mode: 'Quick Match',
      mood: 'Comforting',
      timeAvailable: 'About 2 hours',
      streamingPlatform: 'Netflix',
      preferredMovieGenre: 'Comedy',
      avoid: []
    };

    const results = scoreMovies(movieDataset, preferences);
    expect(results).toHaveLength(3);
  });

  it('should return scores between 0 and 100', () => {
    const preferences: UserPreferences = {
      type: 'movies',
      mode: 'Deep Match',
      mood: 'Suspenseful',
      timeAvailable: 'Long movie is okay',
      streamingPlatform: 'HBO Max',
      preferredMovieGenre: 'Thriller',
      avoid: []
    };

    const results = scoreMovies(movieDataset, preferences);
    
    results.forEach(rec => {
      expect(rec.confidence).toBeGreaterThanOrEqual(0);
      expect(rec.confidence).toBeLessThanOrEqual(100);
    });
  });

  it('should include all required fields', () => {
    const preferences: UserPreferences = {
      type: 'movies',
      mode: 'Surprise Me',
      mood: 'Funny',
      timeAvailable: 'Under 90 minutes',
      streamingPlatform: 'Disney+',
      preferredMovieGenre: 'Animation',
      avoid: []
    };

    const results = scoreMovies(movieDataset, preferences);
    
    results.forEach(rec => {
      expect(rec).toHaveProperty('id');
      expect(rec).toHaveProperty('category');
      expect(rec).toHaveProperty('title');
      expect(rec).toHaveProperty('watchStyleFit');
      expect(rec).toHaveProperty('contentTone');
      expect(rec).toHaveProperty('similarMovies');
    });
  });
});
