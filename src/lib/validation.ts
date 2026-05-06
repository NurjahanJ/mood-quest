import { UserPreferences } from './types';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validatePreferences(preferences: Partial<UserPreferences>): ValidationResult {
  if (!preferences.mood) {
    return { isValid: false, error: 'Mood is required. Please select how you\'re feeling.' };
  }

  if (!preferences.timeAvailable) {
    return { isValid: false, error: 'Time available is required.' };
  }

  if (preferences.type === 'games') {
    if (!preferences.platform) {
      return { isValid: false, error: 'Platform is required for game recommendations.' };
    }
    if (!preferences.playStyle) {
      return { isValid: false, error: 'Play style is required for game recommendations.' };
    }
  }

  return { isValid: true };
}
