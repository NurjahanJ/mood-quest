/**
 * FILE: validation.test.ts
 * PURPOSE: Test input validation logic
 * 
 * TESTS:
 * - Valid game preferences pass
 * - Valid movie preferences pass
 * - Missing required fields fail
 * - Category-specific validation works
 * 
 * STATUS: Complete
 */

import { describe, it, expect } from 'vitest';
import { validatePreferences } from '@/lib/validation';
import { UserPreferences } from '@/lib/types';

describe('Validation', () => {
  it('should pass for valid game preferences', () => {
    const preferences: Partial<UserPreferences> = {
      type: 'games',
      mode: 'Quick Match',
      mood: 'Relaxing',
      timeAvailable: 'About 1 hour',
      platform: 'PC',
      playStyle: 'Solo',
      preferredGenre: 'Simulation',
      avoid: []
    };

    const result = validatePreferences(preferences);
    expect(result.isValid).toBe(true);
  });

  it('should pass for valid movie preferences', () => {
    const preferences: Partial<UserPreferences> = {
      type: 'movies',
      mode: 'Deep Match',
      mood: 'Comforting',
      timeAvailable: 'About 2 hours',
      streamingPlatform: 'Netflix',
      preferredMovieGenre: 'Comedy',
      avoid: []
    };

    const result = validatePreferences(preferences);
    expect(result.isValid).toBe(true);
  });

  it('should fail when category is missing', () => {
    const preferences: Partial<UserPreferences> = {
      mood: 'Relaxing',
      timeAvailable: 'About 1 hour'
    };

    const result = validatePreferences(preferences);
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('type');
  });

  it('should fail when mood is missing', () => {
    const preferences: Partial<UserPreferences> = {
      type: 'games',
      timeAvailable: 'About 1 hour',
      platform: 'PC',
      playStyle: 'Solo'
    };

    const result = validatePreferences(preferences);
    expect(result.isValid).toBe(false);
  });

  it('should fail when platform is missing for games', () => {
    const preferences: Partial<UserPreferences> = {
      type: 'games',
      mood: 'Relaxing',
      timeAvailable: 'About 1 hour',
      playStyle: 'Solo'
    };

    const result = validatePreferences(preferences);
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('platform');
  });

  it('should fail when streaming platform is missing for movies', () => {
    const preferences: Partial<UserPreferences> = {
      type: 'movies',
      mood: 'Comforting',
      timeAvailable: 'About 2 hours'
    };

    const result = validatePreferences(preferences);
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('streaming');
  });

  it('should fail when play style is missing for games', () => {
    const preferences: Partial<UserPreferences> = {
      type: 'games',
      mood: 'Relaxing',
      timeAvailable: 'About 1 hour',
      platform: 'PC'
    };

    const result = validatePreferences(preferences);
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('play style');
  });

  it('should fail when mode is missing', () => {
    const preferences: Partial<UserPreferences> = {
      type: 'games',
      mood: 'Relaxing',
      timeAvailable: 'About 1 hour',
      platform: 'PC',
      playStyle: 'Solo'
    };

    const result = validatePreferences(preferences);
    expect(result.isValid).toBe(false);
  });
});
