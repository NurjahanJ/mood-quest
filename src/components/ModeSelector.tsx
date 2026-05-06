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
    selected: 'bg-night-800 shadow-xl shadow-amber-warm/10 scale-[1.02] border-amber-warm/60',
    iconBg: 'bg-amber-warm/20',
    iconBgHover: 'bg-night-700 group-hover:bg-amber-warm/10',
    iconColor: 'text-amber-warm',
    iconColorDefault: 'text-cream-300 group-hover:text-amber-warm',
    glow: 'from-amber-warm/10',
    dot: 'bg-amber-warm',
  },
  'Deep Match': {
    selected: 'bg-night-800 shadow-xl shadow-rose-warm/10 scale-[1.02] border-rose-warm/60',
    iconBg: 'bg-rose-warm/20',
    iconBgHover: 'bg-night-700 group-hover:bg-rose-warm/10',
    iconColor: 'text-rose-warm',
    iconColorDefault: 'text-cream-300 group-hover:text-rose-warm',
    glow: 'from-rose-warm/10',
    dot: 'bg-rose-warm',
  },
  'Surprise Me': {
    selected: 'bg-night-800 shadow-xl shadow-peach-warm/10 scale-[1.02] border-peach-warm/60',
    iconBg: 'bg-peach-warm/20',
    iconBgHover: 'bg-night-700 group-hover:bg-peach-warm/10',
    iconColor: 'text-peach-warm',
    iconColorDefault: 'text-cream-300 group-hover:text-peach-warm',
    glow: 'from-peach-warm/10',
    dot: 'bg-peach-warm',
  },
};

const modes = [
  {
    id: 'Quick Match' as RecommendationMode,
    icon: Zap,
    title: 'Quick Match',
    description: 'Fast pick, perfect for right now',
  },
  {
    id: 'Deep Match' as RecommendationMode,
    icon: Target,
    title: 'Deep Match',
    description: 'Let\u2019s really think about it',
  },
  {
    id: 'Surprise Me' as RecommendationMode,
    icon: Sparkles,
    title: 'Surprise Me',
    description: 'Close your eyes\u2026',
  },
];

export default function ModeSelector({ value, onChange }: ModeSelectorProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-serif font-bold text-cream-50 mb-8 text-center">
        How should I match you?
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
                group relative overflow-hidden rounded-3xl p-6
                transition-all duration-300 ease-out
                ${isSelected
                  ? styles.selected
                  : 'bg-night-900 hover:bg-night-850 hover:scale-[1.01] shadow-md hover:shadow-lg border-night-700 hover:border-night-600'
                }
                border
              `}
              aria-pressed={isSelected}
              aria-label={`Select ${mode.title} mode`}
            >
              {/* Warm glow */}
              <div className={`
                absolute inset-0 rounded-3xl bg-gradient-to-br ${styles.glow} to-transparent
                transition-opacity duration-300
                ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'}
              `} />
              
              <div className="relative z-10 flex flex-col items-center gap-3 text-center">
                <div className={`
                  p-3 rounded-2xl transition-all duration-300
                  ${isSelected ? styles.iconBg : styles.iconBgHover}
                `}>
                  <Icon 
                    className={`
                      w-8 h-8 transition-colors duration-300
                      ${isSelected ? styles.iconColor : styles.iconColorDefault}
                    `}
                  />
                </div>
                
                <div>
                  <h3 className={`
                    text-lg font-serif font-bold mb-1 transition-colors duration-300
                    ${isSelected ? 'text-cream-50' : 'text-cream-100 group-hover:text-cream-50'}
                  `}>
                    {mode.title}
                  </h3>
                  <p className={`
                    text-xs transition-colors duration-300
                    ${isSelected ? 'text-cream-300' : 'text-cream-400 group-hover:text-cream-300'}
                  `}>
                    {mode.description}
                  </p>
                </div>
              </div>
              
              {isSelected && (
                <div className="absolute top-3 right-3">
                  <div className={`w-4 h-4 ${styles.dot} rounded-full flex items-center justify-center`}>
                    <div className="w-1.5 h-1.5 bg-night-950 rounded-full" />
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
      
      {value && (
        <div className="mt-6 p-4 bg-night-900/80 rounded-2xl border border-night-700">
          <p className="text-sm text-cream-300 text-center font-serif italic">
            {value === 'Quick Match' && 'Prioritizes time and platform — for when you just want something now.'}
            {value === 'Deep Match' && 'Digs into your mood and taste — for the perfect fit.'}
            {value === 'Surprise Me' && 'A little randomness goes a long way — trust me on this one.'}
          </p>
        </div>
      )}
    </div>
  );
}
