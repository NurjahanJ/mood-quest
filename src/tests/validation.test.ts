import { describe, it, expect } from 'vitest';
import { validatePreferences } from '../lib/validation';
import { UserPreferences } from '../lib/types';

describe('validatePreferences', () => {
  it('should pass with all required fields', () => {
    const validPreferences: UserPreferences = {
      mood: 'Relaxing',
      timeAvailable: 'About 1 hour',
      platform: 'PC',
      playStyle: 'Solo',
    };

    const result = validatePreferences(validPreferences);
    expect(result.isValid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('should pass with optional fields included', () => {
    const validPreferences: UserPreferences = {
      mood: 'Competitive',
      timeAvailable: 'Several hours',
      platform: 'PlayStation',
      playStyle: 'Multiplayer',
      preferredGenre: 'Action',
      avoid: ['horror', 'grinding'],
    };

    const result = validatePreferences(validPreferences);
    expect(result.isValid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('should fail when mood is missing', () => {
    const invalidPreferences = {
      timeAvailable: 'About 1 hour',
      platform: 'PC',
      playStyle: 'Solo',
    } as Partial<UserPreferences>;

    const result = validatePreferences(invalidPreferences);
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Mood is required');
  });

  it('should fail when timeAvailable is missing', () => {
    const invalidPreferences = {
      mood: 'Relaxing',
      platform: 'PC',
      playStyle: 'Solo',
    } as Partial<UserPreferences>;

    const result = validatePreferences(invalidPreferences);
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Time available is required');
  });

  it('should fail when platform is missing', () => {
    const invalidPreferences = {
      mood: 'Relaxing',
      timeAvailable: 'About 1 hour',
      playStyle: 'Solo',
    } as Partial<UserPreferences>;

    const result = validatePreferences(invalidPreferences);
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Platform is required');
  });

  it('should fail when playStyle is missing', () => {
    const invalidPreferences = {
      mood: 'Relaxing',
      timeAvailable: 'About 1 hour',
      platform: 'PC',
    } as Partial<UserPreferences>;

    const result = validatePreferences(invalidPreferences);
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Play style is required');
  });

  it('should fail when all fields are missing', () => {
    const invalidPreferences = {} as Partial<UserPreferences>;

    const result = validatePreferences(invalidPreferences);
    expect(result.isValid).toBe(false);
    expect(result.error).toBeDefined();
  });
});
