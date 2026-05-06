/**
 * FILE: CategorySelector.tsx
 * PURPOSE: Category selection component (Games vs Movies)
 * 
 * FEATURES:
 * - Professional dark theme UI
 * - Large clickable cards with icons
 * - Hover and selected states
 * - Responsive design
 * - Accessibility support
 * 
 * PROPS:
 * - value: Current selected category ('games' | 'movies' | null)
 * - onChange: Callback when category is selected
 * 
 * DEPENDENCIES:
 * - types.ts (RecommendationType)
 * - lucide-react (icons)
 * 
 * USED BY:
 * - page.tsx (main recommendation flow)
 * 
 * STATUS: Complete
 * DO NOT MODIFY: Yes (unless improving UI/UX)
 * REASON: User selection component
 */

'use client';

import { RecommendationType } from '@/lib/types';
import { Gamepad2, Film } from 'lucide-react';

interface CategorySelectorProps {
  value: RecommendationType | null;
  onChange: (category: RecommendationType) => void;
}

export default function CategorySelector({ value, onChange }: CategorySelectorProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-serif font-bold text-cream-50 mb-8 text-center">
        What&apos;s stirring tonight?
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Games Card */}
        <button
          onClick={() => onChange('games')}
          className={`
            group relative overflow-hidden rounded-3xl p-8
            transition-all duration-300 ease-out
            ${value === 'games'
              ? 'bg-night-800 shadow-xl shadow-amber-warm/10 scale-[1.02] border-amber-warm/60'
              : 'bg-night-900 hover:bg-night-850 hover:scale-[1.01] shadow-lg hover:shadow-xl border-night-700 hover:border-amber-warm/30'
            }
            border
          `}
          aria-pressed={value === 'games'}
          aria-label="Select games"
        >
          {/* Warm glow on hover/selected */}
          <div className={`
            absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-warm/10 to-transparent
            transition-opacity duration-300
            ${value === 'games' ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'}
          `} />
          
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className={`
              p-4 rounded-2xl transition-all duration-300
              ${value === 'games'
                ? 'bg-amber-warm/20'
                : 'bg-night-700 group-hover:bg-amber-warm/10'
              }
            `}>
              <Gamepad2 
                className={`
                  w-12 h-12 transition-colors duration-300
                  ${value === 'games' ? 'text-amber-warm' : 'text-cream-300 group-hover:text-amber-warm'}
                `}
              />
            </div>
            
            <div className="text-center">
              <h3 className={`
                text-2xl font-serif font-bold mb-2 transition-colors duration-300
                ${value === 'games' ? 'text-cream-50' : 'text-cream-100 group-hover:text-cream-50'}
              `}>
                Games
              </h3>
              <p className={`
                text-sm transition-colors duration-300
                ${value === 'games' ? 'text-cream-300' : 'text-cream-400 group-hover:text-cream-300'}
              `}>
                Your next adventure awaits
              </p>
            </div>
          </div>
          
          {value === 'games' && (
            <div className="absolute top-4 right-4">
              <div className="w-5 h-5 bg-amber-warm rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-night-950 rounded-full" />
              </div>
            </div>
          )}
        </button>

        {/* Movies Card */}
        <button
          onClick={() => onChange('movies')}
          className={`
            group relative overflow-hidden rounded-3xl p-8
            transition-all duration-300 ease-out
            ${value === 'movies'
              ? 'bg-night-800 shadow-xl shadow-rose-warm/10 scale-[1.02] border-rose-warm/60'
              : 'bg-night-900 hover:bg-night-850 hover:scale-[1.01] shadow-lg hover:shadow-xl border-night-700 hover:border-rose-warm/30'
            }
            border
          `}
          aria-pressed={value === 'movies'}
          aria-label="Select movies"
        >
          <div className={`
            absolute inset-0 rounded-3xl bg-gradient-to-br from-rose-warm/10 to-transparent
            transition-opacity duration-300
            ${value === 'movies' ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'}
          `} />
          
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className={`
              p-4 rounded-2xl transition-all duration-300
              ${value === 'movies'
                ? 'bg-rose-warm/20'
                : 'bg-night-700 group-hover:bg-rose-warm/10'
              }
            `}>
              <Film 
                className={`
                  w-12 h-12 transition-colors duration-300
                  ${value === 'movies' ? 'text-rose-warm' : 'text-cream-300 group-hover:text-rose-warm'}
                `}
              />
            </div>
            
            <div className="text-center">
              <h3 className={`
                text-2xl font-serif font-bold mb-2 transition-colors duration-300
                ${value === 'movies' ? 'text-cream-50' : 'text-cream-100 group-hover:text-cream-50'}
              `}>
                Movies
              </h3>
              <p className={`
                text-sm transition-colors duration-300
                ${value === 'movies' ? 'text-cream-300' : 'text-cream-400 group-hover:text-cream-300'}
              `}>
                Tonight&apos;s feature presentation
              </p>
            </div>
          </div>
          
          {value === 'movies' && (
            <div className="absolute top-4 right-4">
              <div className="w-5 h-5 bg-rose-warm rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-night-950 rounded-full" />
              </div>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
