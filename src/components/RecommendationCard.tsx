/**
 * FILE: RecommendationCard.tsx
 * PURPOSE: Display individual recommendation with feedback options
 * 
 * FEATURES:
 * - Shows all recommendation details
 * - Displays confidence score with color coding
 * - Shows individual score breakdowns (mood, time, platform, genre)
 * - Like/Dislike/Save buttons
 * - Different layouts for games vs movies
 * - Professional card design
 * 
 * DEPENDENCIES:
 * - types.ts (GameRecommendation, MovieRecommendation)
 * - storage.ts (for checking saved status)
 * 
 * USED BY:
 * - ResultsSection.tsx (displays multiple cards)
 * 
 * STATUS: Complete
 * DO NOT MODIFY: No - Can be updated for UI improvements
 */

'use client';

import { useState, useEffect } from 'react';
import { GameRecommendation, MovieRecommendation } from '@/lib/types';
import { isSaved } from '@/lib/storage';
import { Heart, X, Bookmark } from 'lucide-react';

interface RecommendationCardProps {
  recommendation: GameRecommendation | MovieRecommendation;
  index: number;
  onLike: (id: string) => void;
  onDislike: (id: string) => void;
  onSave: (recommendation: GameRecommendation | MovieRecommendation) => void;
}

export default function RecommendationCard({
  recommendation,
  index,
  onLike,
  onDislike,
  onSave
}: RecommendationCardProps) {
  const [saved, setSaved] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  useEffect(() => {
    setSaved(isSaved(recommendation.id));
  }, [recommendation.id]);

  const getConfidenceStyle = (confidence: number) => {
    if (confidence >= 90) return { border: 'border-sage-warm/50', bg: 'bg-sage-warm/10', text: 'text-sage-warm', label: 'warm match' };
    if (confidence >= 75) return { border: 'border-amber-warm/50', bg: 'bg-amber-warm/10', text: 'text-amber-warm', label: 'good pick' };
    if (confidence >= 60) return { border: 'border-peach-warm/50', bg: 'bg-peach-warm/10', text: 'text-peach-warm', label: 'worth a try' };
    return { border: 'border-cream-400/30', bg: 'bg-cream-400/5', text: 'text-cream-400', label: 'maybe' };
  };

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setDisliked(false);
      onLike(recommendation.id);
    }
  };

  const handleDislike = () => {
    if (!disliked) {
      setDisliked(true);
      setLiked(false);
      onDislike(recommendation.id);
    }
  };

  const handleSave = () => {
    setSaved(!saved);
    onSave(recommendation);
  };

  const isGame = 'similarGames' in recommendation;
  const similarItems = isGame 
    ? (recommendation as GameRecommendation).similarGames 
    : (recommendation as MovieRecommendation).similarMovies;
  const confidence = getConfidenceStyle(recommendation.confidence);

  return (
    <div className="bg-night-900 rounded-3xl border border-night-700 hover:border-night-600 transition-all duration-300 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-night-700">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <span className="flex items-center justify-center w-9 h-9 bg-amber-warm/20 text-amber-warm rounded-full font-serif font-bold text-lg">
              {index + 1}
            </span>
            <div className="flex-1">
              <h3 className="text-2xl font-serif font-semibold text-cream-50">
                {recommendation.title}
              </h3>
              {'year' in recommendation && recommendation.year && (
                <p className="text-sm text-cream-400 mt-1">{recommendation.year}</p>
              )}
            </div>
          </div>
          <div className={`px-3 py-2 rounded-2xl border ${confidence.border} ${confidence.bg}`}>
            <div className="text-center">
              <div className={`text-xl font-bold ${confidence.text}`}>{recommendation.confidence}</div>
              <div className={`text-[10px] uppercase tracking-wider ${confidence.text} opacity-75`}>{confidence.label}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-5">
        {/* Why It Fits */}
        <div>
          <p className="text-cream-200 leading-relaxed font-serif italic">
            {recommendation.whyItFits}
          </p>
        </div>

        {/* Score Breakdowns */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <div className="text-xs font-medium text-cream-400/60 uppercase tracking-wider">
              Mood
            </div>
            <div className="text-sm text-cream-200">
              {recommendation.moodMatch}
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="text-xs font-medium text-cream-400/60 uppercase tracking-wider">
              Time
            </div>
            <div className="text-sm text-cream-200">
              {recommendation.timeFit}
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="text-xs font-medium text-cream-400/60 uppercase tracking-wider">
              Platform
            </div>
            <div className="text-sm text-cream-200">
              {recommendation.platformFit}
            </div>
          </div>
        </div>

        {/* Game-specific: Play Style */}
        {isGame && 'playStyleFit' in recommendation && (
          <div className="space-y-1">
            <div className="text-xs font-medium text-cream-400/60 uppercase tracking-wider">
              Play Style
            </div>
            <div className="text-sm text-cream-200">
              {recommendation.playStyleFit}
            </div>
          </div>
        )}

        {/* Movie-specific: Watch Style and Content Tone */}
        {!isGame && 'watchStyleFit' in recommendation && (
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-xs font-medium text-cream-400/60 uppercase tracking-wider">
                Watch Style
              </div>
              <div className="text-sm text-cream-200">
                {recommendation.watchStyleFit}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-medium text-cream-400/60 uppercase tracking-wider">
                Content Tone
              </div>
              <div className="text-sm text-cream-200">
                {recommendation.contentTone}
              </div>
            </div>
          </div>
        )}

        {/* Genre */}
        <div className="space-y-1">
          <div className="text-xs font-medium text-cream-400/60 uppercase tracking-wider">
            Genre
          </div>
          <div className="text-sm text-cream-200">
            {recommendation.genreFit}
          </div>
        </div>

        {/* Similar Titles */}
        <div className="pt-4 border-t border-night-700">
          <div className="text-xs font-medium text-cream-400/60 uppercase tracking-wider mb-3">
            If you like this, try
          </div>
          <div className="flex flex-wrap gap-2">
            {similarItems.map((item, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 bg-night-800 text-cream-300 rounded-full text-sm border border-night-700 hover:border-amber-warm/30 hover:text-cream-100 transition-colors"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Feedback Buttons */}
        <div className="pt-4 border-t border-night-700">
          <div className="flex gap-3">
            <button
              onClick={handleLike}
              className={`flex-1 px-4 py-3 rounded-2xl border transition-all ${
                liked
                  ? 'border-rose-warm/60 bg-rose-warm/15 text-rose-warm'
                  : 'border-night-700 bg-night-800 text-cream-400 hover:border-rose-warm/40 hover:text-rose-warm'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                <span className="text-sm font-medium">Love it</span>
              </span>
            </button>

            <button
              onClick={handleDislike}
              className={`flex-1 px-4 py-3 rounded-2xl border transition-all ${
                disliked
                  ? 'border-cream-400/40 bg-cream-400/10 text-cream-300'
                  : 'border-night-700 bg-night-800 text-cream-400 hover:border-cream-400/30 hover:text-cream-300'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <X className="w-4 h-4" />
                <span className="text-sm font-medium">Not for me</span>
              </span>
            </button>

            <button
              onClick={handleSave}
              className={`flex-1 px-4 py-3 rounded-2xl border transition-all ${
                saved
                  ? 'border-amber-warm/60 bg-amber-warm/15 text-amber-warm'
                  : 'border-night-700 bg-night-800 text-cream-400 hover:border-amber-warm/40 hover:text-amber-warm'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
                <span className="text-sm font-medium">Save</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
