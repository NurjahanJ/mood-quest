'use client';

import { useState } from 'react';
import Lumi from '@/components/Lumi';
import MoodBoardInput from '@/components/MoodBoardInput';
import MoodBoardDisplay from '@/components/MoodBoardDisplay';
import { BoardCategory, MoodBoard, GenerateBoardResponse } from '@/lib/types';

export default function Home() {
  const [board, setBoard] = useState<MoodBoard | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (title: string, category: BoardCategory) => {
    setIsLoading(true);
    setError(null);
    setBoard(null);

    try {
      const response = await fetch('/api/generate-board', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, category }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to generate mood board');
      }

      const data: GenerateBoardResponse = await response.json();
      setBoard(data.board);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setBoard(null);
    setError(null);
  };

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Hero Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-cream-50 mb-3 tracking-tight">
            MoodQuest
          </h1>
          <p className="text-lg text-cream-300 font-serif italic">
            Turn any game or movie into a mood board.
          </p>
        </div>

        {/* Input State */}
        {!board && !isLoading && (
          <div className="animate-fade-in">
            <div className="flex justify-center mb-10">
              <Lumi message="What game or movie is on your mind tonight?" size="lg" />
            </div>
            <MoodBoardInput onSubmit={handleGenerate} isLoading={isLoading} />
            {error && (
              <div className="mt-6 max-w-xl mx-auto">
                <div className="bg-rose-warm/10 border border-rose-warm/30 rounded-2xl p-4 text-center">
                  <p className="text-rose-warm text-sm">{error}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-20 animate-fade-in">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-2 border-night-700 border-t-amber-warm mb-6"></div>
            <p className="text-cream-300 text-lg font-serif italic">Lumi is crafting your mood board…</p>
          </div>
        )}

        {/* Board Display */}
        {board && !isLoading && (
          <MoodBoardDisplay board={board} onReset={handleReset} />
        )}

        {/* Footer */}
        <footer className="mt-20 text-center text-cream-400/60 text-sm">
          <p className="font-serif italic">Powered by OpenAI • Built with care</p>
        </footer>
      </div>
    </main>
  );
}

