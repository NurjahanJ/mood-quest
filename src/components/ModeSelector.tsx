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

const modeStyles = {
  'Quick Match': {
    selected: 'bg-gradient-to-br from-emerald-600 to-emerald-800 shadow-xl shadow-emerald-500/30 scale-105 border-emerald-400',
    gradient: 'from-emerald-500/20',
    iconBg: 'bg-emerald-600/20 group-hover:bg-emerald-600/30',
    iconColor: 'text-emerald-400 group-hover:text-emerald-300',
    textColor: 'text-emerald-100',
    dot: 'bg-emerald-600',
  },
  'Deep Match': {
    selected: 'bg-gradient-to-br from-indigo-600 to-indigo-800 shadow-xl shadow-indigo-500/30 scale-105 border-indigo-400',
    gradient: 'from-indigo-500/20',
    iconBg: 'bg-indigo-600/20 group-hover:bg-indigo-600/30',
    iconColor: 'text-indigo-400 group-hover:text-indigo-300',
    textColor: 'text-indigo-100',
    dot: 'bg-indigo-600',
  },
  'Surprise Me': {
    selected: 'bg-gradient-to-br from-pink-600 to-pink-800 shadow-xl shadow-pink-500/30 scale-105 border-pink-400',
    gradient: 'from-pink-500/20',
    iconBg: 'bg-pink-600/20 group-hover:bg-pink-600/30',
    iconColor: 'text-pink-400 group-hover:text-pink-300',
    textColor: 'text-pink-100',
    dot: 'bg-pink-600',
  },
};

const modes = [
  {
    id: 'Quick Match' as RecommendationMode,
    icon: Zap,
    title: 'Quick Match',
    description: 'Fast recommendations based on time and platform',
  },
  {
    id: 'Deep Match' as RecommendationMode,
    icon: Target,
    title: 'Deep Match',
    description: 'Detailed analysis of mood and genre preferences',
  },
  {
    id: 'Surprise Me' as RecommendationMode,
    icon: Sparkles,
    title: 'Surprise Me',
    description: 'Unexpected picks with a touch of randomness',
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
          const styles = modeStyles[mode.id];
          
          return (
            <button
              key={mode.id}
              onClick={() => onChange(mode.id)}
              className={`
                group relative overflow-hidden rounded-xl p-6
                transition-all duration-300 ease-out
                ${isSelected
                  ? styles.selected
                  : 'bg-slate-800 hover:bg-slate-750 hover:scale-102 shadow-md hover:shadow-lg'
                }
                border-2 ${!isSelected ? 'border-slate-700 hover:border-slate-600' : ''}
              `}
              aria-pressed={isSelected}
              aria-label={`Select ${mode.title} mode`}
            >
              {/* Background gradient effect */}
              <div className={`
                absolute inset-0 bg-gradient-to-br ${styles.gradient} to-transparent
                opacity-0 group-hover:opacity-100 transition-opacity duration-300
                ${isSelected ? 'opacity-100' : ''}
              `} />
              
              {/* Content */}
              <div className="relative z-10 flex flex-col items-center gap-3 text-center">
                <div className={`
                  p-3 rounded-full transition-all duration-300
                  ${isSelected
                    ? 'bg-white/20'
                    : styles.iconBg
                  }
                `}>
                  <Icon 
                    className={`
                      w-8 h-8 transition-colors duration-300
                      ${isSelected ? 'text-white' : styles.iconColor}
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
                    ${isSelected ? styles.textColor : 'text-slate-400 group-hover:text-slate-300'}
                  `}>
                    {mode.description}
                  </p>
                </div>
              </div>
              
              {/* Selected indicator */}
              {isSelected && (
                <div className="absolute top-3 right-3">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <div className={`w-2.5 h-2.5 ${styles.dot} rounded-full`} />
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
