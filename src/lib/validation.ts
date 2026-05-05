/**
 * FILE: validation.ts
 * PURPOSE: Validate user preferences before recommendation generation
 * 
 * VALIDATION RULES:
 * - type: Required (games or movies)
 * - mode: Required (Quick Match, Deep Match, or Surprise Me)
 * - mood: Required
 * - timeAvailable: Required
 * - For games: platform and playStyle required
 * - For movies: streamingPlatform optional
 * 
 * DEPENDENCIES:
 * - types.ts (UserPreferences)
 * 
 * USED BY:
 * - route.ts (API endpoint validation)
 * - page.tsx (client-side validation)
 * 
 * STATUS: Complete
 * DO NOT MODIFY: Yes (unless adding new validation rules)
 * REASON: Input validation layer
 */

import { UserPreferences } from './types';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validate user preferences
 * 
 * PROCESS:
 * 1. Check required fields (type, mode, mood, timeAvailable)
 * 2. Check category-specific fields
 * 3. Return validation result with error message if invalid
 * 
 * @param preferences - User preferences to validate
 * @returns Validation result with isValid flag and optional error message
 */
export function validatePreferences(preferences: Partial<UserPreferences>): ValidationResult {
  // Check type
  if (!preferences.type) {
    return {
      isValid: false,
      error: 'Recommendation type is required. Please select either games or movies.',
    };
  }

  // Check mode
  if (!preferences.mode) {
    return {
      isValid: false,
      error: 'Recommendation mode is required. Please select Quick Match, Deep Match, or Surprise Me.',
    };
  }

  // Check mood
  if (!preferences.mood) {
    return {
      isValid: false,
      error: 'Mood is required. Please select how you\'re feeling.',
    };
  }

  // Check time available
  if (!preferences.timeAvailable) {
    return {
      isValid: false,
      error: 'Time available is required. Please select how much time you have.',
    };
  }

  // Category-specific validation
  if (preferences.type === 'games') {
    // Games require platform
    if (!preferences.platform) {
      return {
        isValid: false,
        error: 'Platform is required for game recommendations. Please select your gaming platform.',
      };
    }

    // Games require play style
    if (!preferences.playStyle) {
      return {
        isValid: false,
        error: 'Play style is required for game recommendations. Please select your preferred play style.',
      };
    }
  }

  if (preferences.type === 'movies') {
    // Movies don't require streamingPlatform, but if provided, validate it
    // No additional required fields for movies beyond the common ones
  }

  // All validations passed
  return {
    isValid: true,
  };
}

