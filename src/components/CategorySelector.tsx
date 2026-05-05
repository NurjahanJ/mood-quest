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
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        What are you in the mood for?
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Games Card */}
        <button
          onClick={() => onChange('games')}
          className={`
            group relative overflow-hidden rounded-2xl p-8
            transition-all duration-300 ease-out
            ${value === 'games'
              ? 'bg-gradient-to-br from-purple-600 to-purple-800 shadow-2xl shadow-purple-500/50 scale-105'
              : 'bg-slate-800 hover:bg-slate-750 hover:scale-102 shadow-lg hover:shadow-xl'
            }
            border-2 ${value === 'games' ? 'border-purple-400' : 'border-slate-700 hover:border-slate-600'}
          `}
          aria-pressed={value === 'games'}
          aria-label="Select games"
        >
          {/* Background gradient effect */}
          <div className={`
            absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent
            opacity-0 group-hover:opacity-100 transition-opacity duration-300
            ${value === 'games' ? 'opacity-100' : ''}
          `} />
          
          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className={`
              p-4 rounded-full transition-all duration-300
              ${value === 'games'
                ? 'bg-white/20'
                : 'bg-purple-600/20 group-hover:bg-purple-600/30'
              }
            `}>
              <Gamepad2 
                className={`
                  w-12 h-12 transition-colors duration-300
                  ${value === 'games' ? 'text-white' : 'text-purple-400 group-hover:text-purple-300'}
                `}
              />
            </div>
            
            <div className="text-center">
              <h3 className={`
                text-2xl font-bold mb-2 transition-colors duration-300
                ${value === 'games' ? 'text-white' : 'text-slate-100 group-hover:text-white'}
              `}>
                Games
              </h3>
              <p className={`
                text-sm transition-colors duration-300
                ${value === 'games' ? 'text-purple-100' : 'text-slate-400 group-hover:text-slate-300'}
              `}>
                Find your next gaming adventure
              </p>
            </div>
          </div>
          
          {/* Selected indicator */}
          {value === 'games' && (
            <div className="absolute top-4 right-4">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-purple-600 rounded-full" />
              </div>
            </div>
          )}
        </button>

        {/* Movies Card */}
        <button
          onClick={() => onChange('movies')}
          className={`
            group relative overflow-hidden rounded-2xl p-8
            transition-all duration-300 ease-out
            ${value === 'movies'
              ? 'bg-gradient-to-br from-blue-600 to-blue-800 shadow-2xl shadow-blue-500/50 scale-105'
              : 'bg-slate-800 hover:bg-slate-750 hover:scale-102 shadow-lg hover:shadow-xl'
            }
            border-2 ${value === 'movies' ? 'border-blue-400' : 'border-slate-700 hover:border-slate-600'}
          `}
          aria-pressed={value === 'movies'}
          aria-label="Select movies"
        >
          {/* Background gradient effect */}
          <div className={`
            absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent
            opacity-0 group-hover:opacity-100 transition-opacity duration-300
            ${value === 'movies' ? 'opacity-100' : ''}
          `} />
          
          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className={`
              p-4 rounded-full transition-all duration-300
              ${value === 'movies'
                ? 'bg-white/20'
                : 'bg-blue-600/20 group-hover:bg-blue-600/30'
              }
            `}>
              <Film 
                className={`
                  w-12 h-12 transition-colors duration-300
                  ${value === 'movies' ? 'text-white' : 'text-blue-400 group-hover:text-blue-300'}
                `}
              />
            </div>
            
            <div className="text-center">
              <h3 className={`
                text-2xl font-bold mb-2 transition-colors duration-300
                ${value === 'movies' ? 'text-white' : 'text-slate-100 group-hover:text-white'}
              `}>
                Movies
              </h3>
              <p className={`
                text-sm transition-colors duration-300
                ${value === 'movies' ? 'text-blue-100' : 'text-slate-400 group-hover:text-slate-300'}
              `}>
                Discover your perfect film
              </p>
            </div>
          </div>
          
          {/* Selected indicator */}
          {value === 'movies' && (
            <div className="absolute top-4 right-4">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-blue-600 rounded-full" />
              </div>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
