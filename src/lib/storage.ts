/**
 * FILE: storage.ts
 * PURPOSE: localStorage utilities for user feedback and history
 * 
 * FEATURES:
 * - Like/dislike recommendations
 * - Save favorite recommendations
 * - Store recommendation history
 * - Clear data functions
 * 
 * STORAGE KEYS:
 * - moodquest_liked_recommendations
 * - moodquest_disliked_recommendations
 * - moodquest_saved_recommendations
 * - moodquest_recommendation_history
 * 
 * DEPENDENCIES:
 * - types.ts (GameRecommendation, MovieRecommendation, RecommendationHistory)
 * 
 * USED BY:
 * - page.tsx (for managing user feedback)
 * - RecommendationCard.tsx (for like/dislike/save buttons)
 * - RecommendationHistory.tsx (for displaying history)
 * 
 * STATUS: Complete
 * DO NOT MODIFY: Yes (unless adding features)
 * REASON: Data persistence layer
 */

import { GameRecommendation, MovieRecommendation } from './types';

// Storage keys
const KEYS = {
  LIKED: 'moodquest_liked_recommendations',
  DISLIKED: 'moodquest_disliked_recommendations',
  SAVED: 'moodquest_saved_recommendations',
  HISTORY: 'moodquest_recommendation_history'
};

// Maximum history entries
const MAX_HISTORY = 20;

/**
 * Check if we're in a browser environment
 * Prevents SSR errors
 */
function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Get liked recommendations
 * 
 * @returns Array of recommendation IDs
 */
export function getLikedRecommendations(): string[] {
  if (!isBrowser()) return [];
  
  try {
    const data = localStorage.getItem(KEYS.LIKED);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading liked recommendations:', error);
    return [];
  }
}

/**
 * Add a liked recommendation
 * Prevents duplicates
 * 
 * @param id - Recommendation ID
 */
export function addLikedRecommendation(id: string): void {
  if (!isBrowser()) return;
  
  try {
    const liked = getLikedRecommendations();
    if (!liked.includes(id)) {
      liked.push(id);
      localStorage.setItem(KEYS.LIKED, JSON.stringify(liked));
    }
  } catch (error) {
    console.error('Error adding liked recommendation:', error);
  }
}

/**
 * Remove a liked recommendation
 * 
 * @param id - Recommendation ID
 */
export function removeLikedRecommendation(id: string): void {
  if (!isBrowser()) return;
  
  try {
    const liked = getLikedRecommendations();
    const filtered = liked.filter(item => item !== id);
    localStorage.setItem(KEYS.LIKED, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error removing liked recommendation:', error);
  }
}

/**
 * Get disliked recommendations
 * 
 * @returns Array of recommendation IDs
 */
export function getDislikedRecommendations(): string[] {
  if (!isBrowser()) return [];
  
  try {
    const data = localStorage.getItem(KEYS.DISLIKED);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading disliked recommendations:', error);
    return [];
  }
}

/**
 * Add a disliked recommendation
 * Prevents duplicates
 * 
 * @param id - Recommendation ID
 */
export function addDislikedRecommendation(id: string): void {
  if (!isBrowser()) return;
  
  try {
    const disliked = getDislikedRecommendations();
    if (!disliked.includes(id)) {
      disliked.push(id);
      localStorage.setItem(KEYS.DISLIKED, JSON.stringify(disliked));
    }
  } catch (error) {
    console.error('Error adding disliked recommendation:', error);
  }
}

/**
 * Remove a disliked recommendation
 * 
 * @param id - Recommendation ID
 */
export function removeDislikedRecommendation(id: string): void {
  if (!isBrowser()) return;
  
  try {
    const disliked = getDislikedRecommendations();
    const filtered = disliked.filter(item => item !== id);
    localStorage.setItem(KEYS.DISLIKED, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error removing disliked recommendation:', error);
  }
}

/**
 * Get saved recommendations
 * 
 * @returns Array of saved recommendations
 */
export function getSavedRecommendations(): (GameRecommendation | MovieRecommendation)[] {
  if (!isBrowser()) return [];
  
  try {
    const data = localStorage.getItem(KEYS.SAVED);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading saved recommendations:', error);
    return [];
  }
}

/**
 * Add a saved recommendation
 * Prevents duplicates
 * 
 * @param recommendation - Recommendation to save
 */
export function addSavedRecommendation(recommendation: GameRecommendation | MovieRecommendation): void {
  if (!isBrowser()) return;
  
  try {
    const saved = getSavedRecommendations();
    const exists = saved.find(item => item.id === recommendation.id);
    
    if (!exists) {
      saved.push(recommendation);
      localStorage.setItem(KEYS.SAVED, JSON.stringify(saved));
    }
  } catch (error) {
    console.error('Error adding saved recommendation:', error);
  }
}

/**
 * Remove a saved recommendation
 * 
 * @param id - Recommendation ID
 */
export function removeSavedRecommendation(id: string): void {
  if (!isBrowser()) return;
  
  try {
    const saved = getSavedRecommendations();
    const filtered = saved.filter(item => item.id !== id);
    localStorage.setItem(KEYS.SAVED, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error removing saved recommendation:', error);
  }
}

/**
 * Check if a recommendation is saved
 * 
 * @param id - Recommendation ID
 * @returns True if saved
 */
export function isSaved(id: string): boolean {
  if (!isBrowser()) return false;
  
  const saved = getSavedRecommendations();
  return saved.some(item => item.id === id);
}

/**
 * Recommendation history entry interface
 */
export interface RecommendationHistory {
  id: string;
  date: string;
  category: 'game' | 'movie';
  mood: string;
  topRecommendation: string;
  savedTitles: string[];
}

/**
 * Get recommendation history
 * 
 * @returns Array of history entries
 */
export function getRecommendationHistory(): RecommendationHistory[] {
  if (!isBrowser()) return [];
  
  try {
    const data = localStorage.getItem(KEYS.HISTORY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading recommendation history:', error);
    return [];
  }
}

/**
 * Add to recommendation history
 * Limits to MAX_HISTORY entries
 * 
 * @param entry - History entry
 */
export function addToHistory(entry: RecommendationHistory): void {
  if (!isBrowser()) return;
  
  try {
    const history = getRecommendationHistory();
    history.unshift(entry); // Add to beginning
    
    // Limit to MAX_HISTORY entries
    const limited = history.slice(0, MAX_HISTORY);
    localStorage.setItem(KEYS.HISTORY, JSON.stringify(limited));
  } catch (error) {
    console.error('Error adding to history:', error);
  }
}

/**
 * Clear recommendation history
 */
export function clearHistory(): void {
  if (!isBrowser()) return;
  
  try {
    localStorage.removeItem(KEYS.HISTORY);
  } catch (error) {
    console.error('Error clearing history:', error);
  }
}

/**
 * Clear all stored data
 * Use with caution
 */
export function clearAllData(): void {
  if (!isBrowser()) return;
  
  try {
    localStorage.removeItem(KEYS.LIKED);
    localStorage.removeItem(KEYS.DISLIKED);
    localStorage.removeItem(KEYS.SAVED);
    localStorage.removeItem(KEYS.HISTORY);
  } catch (error) {
    console.error('Error clearing all data:', error);
  }
}
