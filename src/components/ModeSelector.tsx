/**
 * FILE: ModeSelector.tsx
 * PURPOSE: Recommendation mode selection component
 * 
 * FEATURES:
 * - Professional dark theme UI
 * - Three mode options: Quick Match, Deep Match, Surprise Me
 * - Descriptive cards with icons
 * - Hover and selected states
 * - Responsive design
 * - Accessibility support
 * 
 * PROPS:
 * - value: Current selected mode ('Quick Match' | 'Deep Match' | 'Surprise Me' | null)
 * - onChange: Callback when mode is selected
 * 
 * DEPENDENCIES:
 * - types.ts (RecommendationMode)
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

import { RecommendationMode } from '@/lib/types';
import { Zap, Target, Sparkles } from 'lucide-react';

interface ModeSelectorProps {
  value: RecommendationMode | null;
  onChange: (mode: RecommendationMode) => void;
}

const modes = [
  {
    id: 'Quick Match' as RecommendationMode,
    icon: Zap,
    title: 'Quick Match',
    description: 'Fast recommendations based on time and platform',
    color: 'emerald',
  },
  {
    id: 'Deep Match' as RecommendationMode,
    icon: Target,
    title: 'Deep Match',
    description: 'Detailed analysis of mood and genre preferences',
    color: 'indigo',
  },
  {
    id: 'Surprise Me' as RecommendationMode,
    icon: Sparkles,
    title: 'Surprise Me',
    description: 'Unexpected picks with a touch of randomness',
    color: 'pink',
  },
];

export default function ModeSelector({ value, onChange }: ModeSelectorProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        How should we match?
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {modes.map((mode) => {
          const Icon = mode.icon;
          const isSelected = value === mode.id;
          
          return (
            <button
              key={mode.id}
              onClick={() => onChange(mode.id)}
              className={`
                group relative overflow-hidden rounded-xl p-6
                transition-all duration-300 ease-out
                ${isSelected
                  ? `bg-gradient-to-br from-${mode.color}-600 to-${mode.color}-800 shadow-xl shadow-${mode.color}-500/30 scale-105`
                  : 'bg-slate-800 hover:bg-slate-750 hover:scale-102 shadow-md hover:shadow-lg'
                }
                border-2 ${isSelected ? `border-${mode.color}-400` : 'border-slate-700 hover:border-slate-600'}
              `}
              aria-pressed={isSelected}
              aria-label={`Select ${mode.title} mode`}
            >
              {/* Background gradient effect */}
              <div className={`
                absolute inset-0 bg-gradient-to-br from-${mode.color}-500/20 to-transparent
                opacity-0 group-hover:opacity-100 transition-opacity duration-300
                ${isSelected ? 'opacity-100' : ''}
              `} />
              
              {/* Content */}
              <div className="relative z-10 flex flex-col items-center gap-3 text-center">
                <div className={`
                  p-3 rounded-full transition-all duration-300
                  ${isSelected
                    ? 'bg-white/20'
                    : `bg-${mode.color}-600/20 group-hover:bg-${mode.color}-600/30`
                  }
                `}>
                  <Icon 
                    className={`
                      w-8 h-8 transition-colors duration-300
                      ${isSelected ? 'text-white' : `text-${mode.color}-400 group-hover:text-${mode.color}-300`}
                    `}
                  />
                </div>
                
                <div>
                  <h3 className={`
                    text-lg font-bold mb-1 transition-colors duration-300
                    ${isSelected ? 'text-white' : 'text-slate-100 group-hover:text-white'}
                  `}>
                    {mode.title}
                  </h3>
                  <p className={`
                    text-xs transition-colors duration-300
                    ${isSelected ? `text-${mode.color}-100` : 'text-slate-400 group-hover:text-slate-300'}
                  `}>
                    {mode.description}
                  </p>
                </div>
              </div>
              
              {/* Selected indicator */}
              {isSelected && (
                <div className="absolute top-3 right-3">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <div className={`w-2.5 h-2.5 bg-${mode.color}-600 rounded-full`} />
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
      
      {/* Mode explanation */}
      {value && (
        <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
          <p className="text-sm text-slate-300 text-center">
            {value === 'Quick Match' && '⚡ Prioritizes time availability and platform compatibility for instant matches.'}
            {value === 'Deep Match' && '🎯 Analyzes your mood and genre preferences for highly personalized recommendations.'}
            {value === 'Surprise Me' && '✨ Adds variety to your recommendations with unexpected but fitting suggestions.'}
          </p>
        </div>
      )}
    </div>
  );
}
