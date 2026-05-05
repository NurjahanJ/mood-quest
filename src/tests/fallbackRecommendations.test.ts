import { describe, it, expect } from 'vitest';
import { getFallbackRecommendations } from '../lib/fallbackRecommendations';
import { UserPreferences } from '../lib/types';

describe('getFallbackRecommendations', () => {
  it('should return exactly 3 recommendations', () => {
    const preferences: UserPreferences = {
      mood: 'Relaxing',
      timeAvailable: 'About 1 hour',
      platform: 'PC',
      playStyle: 'Solo',
    };

    const recommendations = getFallbackRecommendations(preferences);
    expect(recommendations).toHaveLength(3);
  });

  it('should return recommendations with all required fields', () => {
    const preferences: UserPreferences = {
      mood: 'Competitive',
      timeAvailable: 'Under 30 minutes',
      platform: 'Nintendo Switch',
      playStyle: 'Multiplayer',
    };

    const recommendations = getFallbackRecommendations(preferences);

    recommendations.forEach((rec) => {
      expect(rec).toHaveProperty('title');
      expect(rec).toHaveProperty('whyItFits');
      expect(rec).toHaveProperty('moodMatch');
      expect(rec).toHaveProperty('timeFit');
      expect(rec).toHaveProperty('platformFit');
      expect(rec).toHaveProperty('similarGames');
      expect(rec).toHaveProperty('confidence');

      expect(typeof rec.title).toBe('string');
      expect(typeof rec.whyItFits).toBe('string');
      expect(typeof rec.moodMatch).toBe('string');
      expect(typeof rec.timeFit).toBe('string');
      expect(typeof rec.platformFit).toBe('string');
      expect(Array.isArray(rec.similarGames)).toBe(true);
      expect(typeof rec.confidence).toBe('number');
    });
  });

  it('should return confidence scores between 1 and 100', () => {
    const preferences: UserPreferences = {
      mood: 'Strategic',
      timeAvailable: 'Several hours',
      platform: 'PC',
      playStyle: 'Solo',
    };

    const recommendations = getFallbackRecommendations(preferences);

    recommendations.forEach((rec) => {
      expect(rec.confidence).toBeGreaterThanOrEqual(1);
      expect(rec.confidence).toBeLessThanOrEqual(100);
    });
  });

  it('should return different recommendations for different moods', () => {
    const relaxingPrefs: UserPreferences = {
      mood: 'Relaxing',
      timeAvailable: 'About 1 hour',
      platform: 'PC',
      playStyle: 'Solo',
    };

    const competitivePrefs: UserPreferences = {
      mood: 'Competitive',
      timeAvailable: 'About 1 hour',
      platform: 'PC',
      playStyle: 'Solo',
    };

    const relaxingRecs = getFallbackRecommendations(relaxingPrefs);
    const competitiveRecs = getFallbackRecommendations(competitivePrefs);

    expect(relaxingRecs[0].title).not.toBe(competitiveRecs[0].title);
  });

  it('should handle all mood types', () => {
    const moods: Array<UserPreferences['mood']> = [
      'Relaxing',
      'Cozy',
      'Competitive',
      'Story-driven',
      'Strategic',
      'Chaotic',
    ];

    moods.forEach((mood) => {
      const preferences: UserPreferences = {
        mood,
        timeAvailable: 'About 1 hour',
        platform: 'PC',
        playStyle: 'Solo',
      };

      const recommendations = getFallbackRecommendations(preferences);
      expect(recommendations).toHaveLength(3);
      expect(recommendations[0].confidence).toBeGreaterThan(0);
    });
  });

  it('should return valid similarGames arrays', () => {
    const preferences: UserPreferences = {
      mood: 'Cozy',
      timeAvailable: 'About 1 hour',
      platform: 'Nintendo Switch',
      playStyle: 'Solo',
    };

    const recommendations = getFallbackRecommendations(preferences);

    recommendations.forEach((rec) => {
      expect(rec.similarGames.length).toBeGreaterThan(0);
      rec.similarGames.forEach((game) => {
        expect(typeof game).toBe('string');
        expect(game.length).toBeGreaterThan(0);
      });
    });
  });

  it('should adjust confidence when preferredGenre is specified', () => {
    const prefsWithoutGenre: UserPreferences = {
      mood: 'Story-driven',
      timeAvailable: 'Several hours',
      platform: 'PlayStation',
      playStyle: 'Solo',
    };

    const prefsWithGenre: UserPreferences = {
      mood: 'Story-driven',
      timeAvailable: 'Several hours',
      platform: 'PlayStation',
      playStyle: 'Solo',
      preferredGenre: 'RPG',
    };

    const recsWithoutGenre = getFallbackRecommendations(prefsWithoutGenre);
    const recsWithGenre = getFallbackRecommendations(prefsWithGenre);

    expect(recsWithGenre[0].confidence).toBeLessThan(recsWithoutGenre[0].confidence);
  });
});
