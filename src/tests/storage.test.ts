/**
 * FILE: storage.test.ts
 * PURPOSE: Test localStorage utilities
 * 
 * TESTS:
 * - Add/remove liked recommendations
 * - Add/remove disliked recommendations
 * - Add/remove saved recommendations
 * - History management
 * - Clear functions
 * 
 * STATUS: Complete
 */

import { describe, it, expect, beforeEach } from 'vitest';
import {
  addLikedRecommendation,
  getLikedRecommendations,
  removeLikedRecommendation,
  addDislikedRecommendation,
  getDislikedRecommendations,
  addSavedRecommendation,
  getSavedRecommendations,
  removeSavedRecommendation,
  isSaved,
  addToHistory,
  getRecommendationHistory,
  clearHistory,
  clearAllData
} from '@/lib/storage';
import { GameRecommendation } from '@/lib/types';

describe('Storage Utilities', () => {
  beforeEach(() => {
    clearAllData();
  });

  describe('Liked Recommendations', () => {
    it('should add liked recommendation', () => {
      addLikedRecommendation('game-1');
      const liked = getLikedRecommendations();
      expect(liked).toContain('game-1');
    });

    it('should remove liked recommendation', () => {
      addLikedRecommendation('game-1');
      removeLikedRecommendation('game-1');
      const liked = getLikedRecommendations();
      expect(liked).not.toContain('game-1');
    });

    it('should not add duplicates', () => {
      addLikedRecommendation('game-1');
      addLikedRecommendation('game-1');
      const liked = getLikedRecommendations();
      expect(liked.filter(id => id === 'game-1')).toHaveLength(1);
    });
  });

  describe('Disliked Recommendations', () => {
    it('should add disliked recommendation', () => {
      addDislikedRecommendation('game-2');
      const disliked = getDislikedRecommendations();
      expect(disliked).toContain('game-2');
    });

    it('should not add duplicates', () => {
      addDislikedRecommendation('game-2');
      addDislikedRecommendation('game-2');
      const disliked = getDislikedRecommendations();
      expect(disliked.filter(id => id === 'game-2')).toHaveLength(1);
    });
  });

  describe('Saved Recommendations', () => {
    const mockRecommendation: GameRecommendation = {
      id: 'game-3',
      category: 'game',
      title: 'Test Game',
      whyItFits: 'Test reason',
      moodMatch: 'Perfect',
      timeFit: 'Good',
      platformFit: 'PC',
      playStyleFit: 'Solo',
      genreFit: 'RPG',
      similarGames: ['Game 1', 'Game 2', 'Game 3'],
      confidence: 85,
      scores: {
        mood: 90,
        time: 80,
        platform: 100,
        genre: 85,
        overall: 88
      }
    };

    it('should add saved recommendation', () => {
      addSavedRecommendation(mockRecommendation);
      const saved = getSavedRecommendations();
      expect(saved).toHaveLength(1);
      expect(saved[0].id).toBe('game-3');
    });

    it('should remove saved recommendation', () => {
      addSavedRecommendation(mockRecommendation);
      removeSavedRecommendation('game-3');
      const saved = getSavedRecommendations();
      expect(saved).toHaveLength(0);
    });

    it('should check if recommendation is saved', () => {
      addSavedRecommendation(mockRecommendation);
      expect(isSaved('game-3')).toBe(true);
      expect(isSaved('game-999')).toBe(false);
    });

    it('should not add duplicate saved recommendations', () => {
      addSavedRecommendation(mockRecommendation);
      addSavedRecommendation(mockRecommendation);
      const saved = getSavedRecommendations();
      expect(saved).toHaveLength(1);
    });
  });

  describe('History', () => {
    it('should add to history', () => {
      addToHistory({
        id: '1',
        date: new Date().toISOString(),
        category: 'game',
        mood: 'Relaxing',
        topRecommendation: 'Stardew Valley',
        savedTitles: []
      });

      const history = getRecommendationHistory();
      expect(history).toHaveLength(1);
      expect(history[0].topRecommendation).toBe('Stardew Valley');
    });

    it('should add multiple history entries', () => {
      addToHistory({
        id: '1',
        date: new Date().toISOString(),
        category: 'game',
        mood: 'Relaxing',
        topRecommendation: 'Stardew Valley',
        savedTitles: []
      });

      addToHistory({
        id: '2',
        date: new Date().toISOString(),
        category: 'movie',
        mood: 'Comforting',
        topRecommendation: 'The Grand Budapest Hotel',
        savedTitles: []
      });

      const history = getRecommendationHistory();
      expect(history).toHaveLength(2);
    });

    it('should clear history', () => {
      addToHistory({
        id: '1',
        date: new Date().toISOString(),
        category: 'game',
        mood: 'Relaxing',
        topRecommendation: 'Stardew Valley',
        savedTitles: []
      });

      clearHistory();
      const history = getRecommendationHistory();
      expect(history).toHaveLength(0);
    });

    it('should include saved titles in history', () => {
      addToHistory({
        id: '1',
        date: new Date().toISOString(),
        category: 'game',
        mood: 'Relaxing',
        topRecommendation: 'Stardew Valley',
        savedTitles: ['Stardew Valley', 'Celeste']
      });

      const history = getRecommendationHistory();
      expect(history[0].savedTitles).toHaveLength(2);
      expect(history[0].savedTitles).toContain('Stardew Valley');
      expect(history[0].savedTitles).toContain('Celeste');
    });
  });

  describe('Clear All Data', () => {
    it('should clear all storage data', () => {
      // Add some data
      addLikedRecommendation('game-1');
      addDislikedRecommendation('game-2');
      addToHistory({
        id: '1',
        date: new Date().toISOString(),
        category: 'game',
        mood: 'Relaxing',
        topRecommendation: 'Test',
        savedTitles: []
      });

      // Clear all
      clearAllData();

      // Verify everything is cleared
      expect(getLikedRecommendations()).toHaveLength(0);
      expect(getDislikedRecommendations()).toHaveLength(0);
      expect(getRecommendationHistory()).toHaveLength(0);
      expect(getSavedRecommendations()).toHaveLength(0);
    });
  });
});
