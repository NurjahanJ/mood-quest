'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSavedBoards, deleteBoard, SavedBoard } from '@/lib/boardStorage';
import { Trash2, ArrowLeft, Image as ImageIcon } from 'lucide-react';

export default function GalleryPage() {
  const router = useRouter();
  const [boards, setBoards] = useState<SavedBoard[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<SavedBoard | null>(null);

  useEffect(() => {
    setBoards(getSavedBoards());
  }, []);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteBoard(id);
    setBoards(getSavedBoards());
  };

  if (boards.length === 0) {
    return (
      <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1
            className="text-5xl md:text-6xl font-serif font-bold text-cream-50 mb-3 tracking-tight cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => router.push('/')}
          >
            MoodQuest
          </h1>
          <p className="text-lg text-cream-300 font-serif italic mb-12">Your saved mood boards</p>

          <div className="bg-night-900 border border-night-700 rounded-3xl p-12">
            <ImageIcon className="w-16 h-16 text-cream-400/20 mx-auto mb-4" />
            <p className="text-cream-300 text-lg mb-2">No saved boards yet</p>
            <p className="text-cream-400/60 text-sm mb-6">Generate a mood board and save it to see it here.</p>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-3 bg-night-800 text-cream-200 rounded-full border border-night-700 hover:border-amber-warm/40 hover:text-amber-warm transition-all"
            >
              Create a mood board
            </button>
          </div>
        </div>
      </main>
    );
  }

  // View a single saved board
  if (selectedBoard) {
    // Lazy-import MoodBoardDisplay
    const MoodBoardDisplay = require('@/components/MoodBoardDisplay').default;
    return (
      <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h1
              className="text-5xl md:text-6xl font-serif font-bold text-cream-50 mb-3 tracking-tight cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => router.push('/')}
            >
              MoodQuest
            </h1>
          </div>
          <div className="text-center mb-8">
            <button
              onClick={() => setSelectedBoard(null)}
              className="text-sm text-cream-400 hover:text-amber-warm transition-colors flex items-center gap-1 mx-auto"
            >
              <ArrowLeft className="w-4 h-4" /> Back to gallery
            </button>
          </div>
          <MoodBoardDisplay board={selectedBoard} onReset={() => setSelectedBoard(null)} />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1
            className="text-5xl md:text-6xl font-serif font-bold text-cream-50 mb-3 tracking-tight cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => router.push('/')}
          >
            MoodQuest
          </h1>
          <p className="text-lg text-cream-300 font-serif italic">Your saved mood boards</p>
        </div>

        <div className="text-center mb-8">
          <button
            onClick={() => router.push('/')}
            className="text-sm text-cream-400 hover:text-amber-warm transition-colors flex items-center gap-1 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" /> Back to home
          </button>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {boards.map((board) => (
            <div
              key={board.id}
              onClick={() => setSelectedBoard(board)}
              className="break-inside-avoid bg-night-900 border border-night-700 rounded-3xl overflow-hidden cursor-pointer hover:border-amber-warm/30 transition-all hover:shadow-lg hover:shadow-amber-warm/5 group"
            >
              {/* Card Image */}
              <div className="w-full aspect-[3/2] relative overflow-hidden">
                {board.heroImage ? (
                  <img
                    src={board.heroImage}
                    alt={board.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div
                    className="w-full h-full"
                    style={{
                      background: board.colorPalette.length > 0
                        ? `linear-gradient(135deg, ${board.colorPalette.map((c) => c.hex).join(', ')})`
                        : 'linear-gradient(135deg, #2a1f3a, #f5a35a)',
                    }}
                  />
                )}
                {/* Category badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 bg-night-950/70 backdrop-blur-sm rounded-full text-xs text-cream-300">
                    {board.category === 'game' ? '🎮 Game' : '🎬 Movie'}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4">
                <h3 className="text-lg font-serif font-bold text-cream-50 mb-1">{board.title}</h3>
                <p className="text-cream-400 text-sm font-serif italic mb-3 line-clamp-2">
                  &ldquo;{board.tagline}&rdquo;
                </p>

                {/* Color strip */}
                <div className="flex gap-1 mb-3">
                  {board.colorPalette.slice(0, 5).map((color, i) => (
                    <div
                      key={i}
                      className="h-2 flex-1 rounded-full"
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {board.aestheticTags.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-night-800 border border-night-700 text-cream-400 rounded-full text-[10px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className="text-cream-400/40 text-xs">
                    {new Date(board.savedAt).toLocaleDateString()}
                  </span>
                  <button
                    onClick={(e) => handleDelete(board.id, e)}
                    className="p-1.5 text-cream-400/40 hover:text-rose-warm transition-colors rounded-lg hover:bg-rose-warm/10"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
