import { UserPreferences } from './types';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validatePreferences(preferences: Partial<UserPreferences>): ValidationResult {
  if (!preferences.mood) {
    return {
      isValid: false,
      error: 'Mood is required',
    };
  }

  if (!preferences.timeAvailable) {
    return {
      isValid: false,
      error: 'Time available is required',
    };
  }

  if (!preferences.platform) {
    return {
      isValid: false,
      error: 'Platform is required',
    };
  }

  if (!preferences.playStyle) {
    return {
      isValid: false,
      error: 'Play style is required',
    };
  }

  return {
    isValid: true,
  };
}
