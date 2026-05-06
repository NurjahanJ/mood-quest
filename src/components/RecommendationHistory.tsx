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
    if (confirm('Clear your recommendation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  if (history.length === 0) {
    return (
      <div className="bg-night-900 rounded-3xl border border-night-700 p-6">
        <h3 className="text-lg font-serif font-bold text-cream-50 mb-4">Things you&apos;ve explored</h3>
        <p className="text-cream-400/60 text-center py-6 text-sm">Nothing here yet — your picks will show up after your first session.</p>
      </div>
    );
  }

  return (
    <div className="bg-night-900 rounded-3xl border border-night-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-serif font-bold text-cream-50">Things you&apos;ve explored</h3>
        <button
          onClick={handleClear}
          className="text-xs text-cream-400/60 hover:text-rose-warm transition-colors"
        >
          Clear
        </button>
      </div>

      <div className="space-y-3">
        {history.map((session) => (
          <div key={session.id} className="border-b border-night-700 pb-3 last:border-0 last:pb-0">
            <div className="flex items-start gap-3">
              <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                session.category === 'game' ? 'bg-amber-warm' : 'bg-rose-warm'
              }`} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-cream-100 truncate">
                  {session.topRecommendation}
                </div>
                <div className="text-xs text-cream-400/60 mt-0.5">
                  {new Date(session.date).toLocaleDateString()} · {session.mood}
                </div>
                {session.savedTitles.length > 0 && (
                  <div className="text-xs text-cream-400/40 mt-1">
                    Saved: {session.savedTitles.join(', ')}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
