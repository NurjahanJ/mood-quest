/**
 * FILE: RecommendationHistory.tsx
 * PURPOSE: Display past recommendation sessions
 * 
 * FEATURES:
 * - Shows list of past sessions
 * - Displays date, category, mood, top pick
 * - Shows saved titles from each session
 * - Clear history button
 * - Empty state when no history
 * 
 * DEPENDENCIES:
 * - types.ts (RecommendationHistory)
 * - storage.ts (getRecommendationHistory, clearHistory)
 * 
 * USED BY:
 * - page.tsx (optional sidebar or modal)
 * 
 * STATUS: Complete
 * DO NOT MODIFY: No - Can be updated for UI improvements
 */

'use client';

import { useState, useEffect } from 'react';
import { RecommendationHistory as HistoryType } from '@/lib/storage';
import { getRecommendationHistory, clearHistory } from '@/lib/storage';

export default function RecommendationHistory() {
  const [history, setHistory] = useState<HistoryType[]>([]);

  useEffect(() => {
    setHistory(getRecommendationHistory());
  }, []);

  const handleClear = () => {
    if (confirm('Are you sure you want to clear your recommendation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  if (history.length === 0) {
    return (
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
        <h3 className="text-xl font-bold text-white mb-4">Recommendation History</h3>
        <p className="text-gray-500 text-center py-8">No recommendation history yet</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">Recommendation History</h3>
        <button
          onClick={handleClear}
          className="text-sm text-gray-500 hover:text-red-400 transition-colors"
        >
          Clear History
        </button>
      </div>

      <div className="space-y-4">
        {history.map((session) => (
          <div key={session.id} className="border-b border-gray-800 pb-4 last:border-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="text-sm font-medium text-white">
                  {session.category === 'game' ? '🎮' : '🎬'} {session.topRecommendation}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(session.date).toLocaleDateString()} • {session.mood}
                </div>
              </div>
            </div>
            {session.savedTitles.length > 0 && (
              <div className="text-xs text-gray-600">
                Saved: {session.savedTitles.join(', ')}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
