'use client';

import { useState } from 'react';
import { Palette, Sparkles } from 'lucide-react';
import Lumi from '@/components/Lumi';
import MoodBoardInput from '@/components/MoodBoardInput';
import MoodBoardDisplay from '@/components/MoodBoardDisplay';
import RecommendationForm from '@/components/RecommendationForm';
import RecommendationResults from '@/components/RecommendationResults';
import {
  BoardCategory,
  MoodBoard,
  GenerateBoardResponse,
  UserPreferences,
  GameRecommendation,
  MovieRecommendation,
  RecommendationResponse,
} from '@/lib/types';

type AppMode = 'landing' | 'mood-board' | 'recommend';

export default function Home() {
  const [mode, setMode] = useState<AppMode>('landing');

  // Mood board state
  const [board, setBoard] = useState<MoodBoard | null>(null);
  const [boardLoading, setBoardLoading] = useState(false);
  const [boardError, setBoardError] = useState<string | null>(null);

  // Recommendation state
  const [recommendations, setRecommendations] = useState<(GameRecommendation | MovieRecommendation)[] | null>(null);
  const [recLoading, setRecLoading] = useState(false);
  const [recError, setRecError] = useState<string | null>(null);

  // ─── Mood Board Handlers ──────────────────────────────────────────

  const handleGenerateBoard = async (title: string, category: BoardCategory) => {
    setBoardLoading(true);
    setBoardError(null);
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
      setBoardError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setBoardLoading(false);
    }
  };

  // ─── Recommendation Handlers ──────────────────────────────────────

  const handleRecommend = async (preferences: UserPreferences) => {
    setRecLoading(true);
    setRecError(null);
    setRecommendations(null);

    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preferences),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to get recommendations');
      }

      const data: RecommendationResponse = await response.json();
      setRecommendations(data.recommendations);
    } catch (err) {
      setRecError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setRecLoading(false);
    }
  };

  // ─── Navigation ───────────────────────────────────────────────────

  const goToLanding = () => {
    setMode('landing');
    setBoard(null);
    setBoardError(null);
    setRecommendations(null);
    setRecError(null);
  };

  const resetBoard = () => {
    setBoard(null);
    setBoardError(null);
  };

  const resetRecs = () => {
    setRecommendations(null);
    setRecError(null);
  };

  // ─── Render ───────────────────────────────────────────────────────

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Hero Header */}
        <div className="text-center mb-10">
          <h1
            className="text-5xl md:text-6xl font-serif font-bold text-cream-50 mb-3 tracking-tight cursor-pointer hover:opacity-80 transition-opacity"
            onClick={goToLanding}
          >
            MoodQuest
          </h1>
          <p className="text-lg text-cream-300 font-serif italic">
            {mode === 'landing' && 'Discover your next vibe.'}
            {mode === 'mood-board' && 'Turn any game or movie into a mood board.'}
            {mode === 'recommend' && 'Find your perfect pick based on how you feel.'}
          </p>
        </div>

        {/* Back button when not on landing */}
        {mode !== 'landing' && !board && !recommendations && (
          <div className="text-center mb-8">
            <button
              onClick={goToLanding}
              className="text-sm text-cream-400 hover:text-amber-warm transition-colors"
            >
              ← Back to menu
            </button>
          </div>
        )}

        {/* ═══ LANDING ═══ */}
        {mode === 'landing' && (
          <div className="animate-fade-in">
            <div className="flex justify-center mb-10">
              <Lumi message="Let's find something perfect for you." size="lg" />
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {/* Mood Board Card */}
              <button
                onClick={() => setMode('mood-board')}
                className="group bg-night-900 border border-night-700 rounded-3xl p-8 text-left hover:border-amber-warm/40 transition-all hover:shadow-lg hover:shadow-amber-warm/5"
              >
                <div className="w-12 h-12 bg-amber-warm/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-amber-warm/20 transition-colors">
                  <Palette className="w-6 h-6 text-amber-warm" />
                </div>
                <h3 className="text-xl font-serif font-bold text-cream-50 mb-2">Mood Board</h3>
                <p className="text-cream-400 text-sm leading-relaxed">
                  Type a game or movie title and get a full creative mood board — colors, emotions, vibes, and more.
                </p>
              </button>

              {/* Recommendations Card */}
              <button
                onClick={() => setMode('recommend')}
                className="group bg-night-900 border border-night-700 rounded-3xl p-8 text-left hover:border-rose-warm/40 transition-all hover:shadow-lg hover:shadow-rose-warm/5"
              >
                <div className="w-12 h-12 bg-rose-warm/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-rose-warm/20 transition-colors">
                  <Sparkles className="w-6 h-6 text-rose-warm" />
                </div>
                <h3 className="text-xl font-serif font-bold text-cream-50 mb-2">Recommendations</h3>
                <p className="text-cream-400 text-sm leading-relaxed">
                  Tell me your mood, time, and platform — I&apos;ll find the perfect game or movie for you.
                </p>
              </button>
            </div>
          </div>
        )}

        {/* ═══ MOOD BOARD FLOW ═══ */}
        {mode === 'mood-board' && (
          <>
            {/* Input */}
            {!board && !boardLoading && (
              <div className="animate-fade-in">
                <div className="flex justify-center mb-10">
                  <Lumi message="What game or movie is on your mind?" size="lg" />
                </div>
                <MoodBoardInput onSubmit={handleGenerateBoard} isLoading={boardLoading} />
                {boardError && (
                  <div className="mt-6 max-w-xl mx-auto">
                    <div className="bg-rose-warm/10 border border-rose-warm/30 rounded-2xl p-4 text-center">
                      <p className="text-rose-warm text-sm">{boardError}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Loading */}
            {boardLoading && (
              <div className="text-center py-20 animate-fade-in">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-2 border-night-700 border-t-amber-warm mb-6"></div>
                <p className="text-cream-300 text-lg font-serif italic">Lumi is crafting your mood board…</p>
              </div>
            )}

            {/* Display */}
            {board && !boardLoading && (
              <MoodBoardDisplay board={board} onReset={resetBoard} />
            )}
          </>
        )}

        {/* ═══ RECOMMENDATION FLOW ═══ */}
        {mode === 'recommend' && (
          <>
            {/* Form */}
            {!recommendations && !recLoading && (
              <div className="animate-fade-in">
                <div className="flex justify-center mb-10">
                  <Lumi message="Tell me what you're in the mood for…" size="lg" />
                </div>
                <RecommendationForm onSubmit={handleRecommend} isLoading={recLoading} />
                {recError && (
                  <div className="mt-6 max-w-xl mx-auto">
                    <div className="bg-rose-warm/10 border border-rose-warm/30 rounded-2xl p-4 text-center">
                      <p className="text-rose-warm text-sm">{recError}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Loading */}
            {recLoading && (
              <div className="text-center py-20 animate-fade-in">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-2 border-night-700 border-t-amber-warm mb-6"></div>
                <p className="text-cream-300 text-lg font-serif italic">Finding your perfect picks…</p>
              </div>
            )}

            {/* Results */}
            {recommendations && !recLoading && (
              <RecommendationResults recommendations={recommendations} onReset={resetRecs} />
            )}
          </>
        )}

        {/* Footer */}
        <footer className="mt-20 text-center text-cream-400/60 text-sm">
          <p className="font-serif italic">Powered by OpenAI • Built with care</p>
        </footer>
      </div>
    </main>
  );
}
