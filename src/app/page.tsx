'use client';

import { useState } from 'react';
import Lumi from '@/components/Lumi';
import CategorySelector from '@/components/CategorySelector';
import ModeSelector from '@/components/ModeSelector';
import PreferenceForm from '@/components/PreferenceForm';
import ResultsSection from '@/components/ResultsSection';
import TasteProfile from '@/components/TasteProfile';
import RecommendationHistory from '@/components/RecommendationHistory';
import {
  RecommendationType,
  RecommendationMode,
  UserPreferences,
  GameRecommendation,
  MovieRecommendation,
  TasteProfile as TasteProfileType,
  RecommendationResponse
} from '@/lib/types';
import {
  addLikedRecommendation,
  addDislikedRecommendation,
  addSavedRecommendation,
  removeSavedRecommendation,
  getSavedRecommendations,
  addToHistory
} from '@/lib/storage';



export default function Home() {
  // Step management
  const [currentStep, setCurrentStep] = useState(1);
  
  // User selections
  const [category, setCategory] = useState<RecommendationType | null>(null);
  const [mode, setMode] = useState<RecommendationMode | null>(null);
  const [lastPreferences, setLastPreferences] = useState<UserPreferences | null>(null);
  
  // Recommendations
  const [recommendations, setRecommendations] = useState<(GameRecommendation | MovieRecommendation)[] | null>(null);
  const [tasteProfile, setTasteProfile] = useState<TasteProfileType | null>(null);
  
  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Feedback tracking
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [dislikedIds, setDislikedIds] = useState<string[]>([]);



  /**
   * Handle category selection
   * Moves to step 2 (mode selection)
   */
  const handleCategorySelect = (selectedCategory: RecommendationType) => {
    setCategory(selectedCategory);
    setCurrentStep(2);
  };

  /**
   * Handle mode selection
   * Moves to step 3 (preference form)
   */
  const handleModeSelect = (selectedMode: RecommendationMode) => {
    setMode(selectedMode);
    setCurrentStep(3);
  };

  /**
   * Handle form submission
   * Calls /api/recommend and moves to step 4 (results)
   */
  const handleFormSubmit = async (preferences: UserPreferences) => {
    setIsLoading(true);
    setError(null);
    setRecommendations(null);
    setTasteProfile(null);
    setLastPreferences(preferences);

    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferences),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get recommendations');
      }

      const data: RecommendationResponse = await response.json();
      
      setRecommendations(data.recommendations);
      setTasteProfile(data.tasteProfile || null);
      setCurrentStep(4);

      // Add to history
      if (data.recommendations.length > 0) {
        const saved = getSavedRecommendations();
        const savedTitles = saved.map(s => s.title);
        
        addToHistory({
          id: Date.now().toString(),
          date: new Date().toISOString(),
          category: preferences.type === 'games' ? 'game' : 'movie',
          mood: preferences.mood,
          topRecommendation: data.recommendations[0].title,
          savedTitles
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setCurrentStep(4);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle like action
   * Adds to liked list, removes from disliked
   */
  const handleLike = (id: string) => {
    addLikedRecommendation(id);
    setLikedIds([...likedIds, id]);
    setDislikedIds(dislikedIds.filter(did => did !== id));
  };

  /**
   * Handle dislike action
   * Adds to disliked list, removes from liked
   */
  const handleDislike = (id: string) => {
    addDislikedRecommendation(id);
    setDislikedIds([...dislikedIds, id]);
    setLikedIds(likedIds.filter(lid => lid !== id));
  };

  /**
   * Handle save action
   * Toggles save status
   */
  const handleSave = (recommendation: GameRecommendation | MovieRecommendation) => {
    const saved = getSavedRecommendations();
    const exists = saved.find(s => s.id === recommendation.id);
    
    if (exists) {
      removeSavedRecommendation(recommendation.id);
    } else {
      addSavedRecommendation(recommendation);
    }
  };

  /**
   * Handle refine recommendations
   * Calls /api/refine with feedback
   */
  const handleRefine = async () => {
    if (!lastPreferences) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/refine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          originalPreferences: lastPreferences,
          likedRecommendations: likedIds,
          dislikedRecommendations: dislikedIds,
          savedRecommendations: getSavedRecommendations().map(s => s.id)
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to refine recommendations');
      }

      const data: RecommendationResponse = await response.json();
      
      setRecommendations(data.recommendations);
      setTasteProfile(data.tasteProfile || null);
      
      // Reset feedback for new recommendations
      setLikedIds([]);
      setDislikedIds([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refine');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Reset to start
   */
  const handleStartOver = () => {
    setCurrentStep(1);
    setCategory(null);
    setMode(null);
    setRecommendations(null);
    setTasteProfile(null);
    setError(null);
    setLikedIds([]);
    setDislikedIds([]);
    setLastPreferences(null);
  };



  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Hero Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-cream-50 mb-3 tracking-tight">
            MoodQuest
          </h1>
          <p className="text-lg text-cream-300 font-serif italic">
            Cozy picks for whatever you&apos;re feeling tonight.
          </p>
        </div>

        {/* Progress Indicator */}
        {currentStep > 1 && (
          <div className="mb-10">
            <div className="flex items-center justify-center gap-2 mb-3">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    step <= currentStep 
                      ? 'w-10 bg-amber-warm' 
                      : 'w-6 bg-night-700'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={handleStartOver}
              className="block mx-auto text-sm text-cream-400 hover:text-amber-warm transition-colors"
            >
              Start fresh
            </button>
          </div>
        )}

        {/* Step 1: Category Selection */}
        {currentStep === 1 && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <Lumi message="Hey there! Take your time — I'll be here." size="sm" />
            </div>
            <CategorySelector value={category} onChange={handleCategorySelect} />
          </div>
        )}

        {/* Step 2: Mode Selection */}
        {currentStep === 2 && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <Lumi message="No wrong answer here." size="sm" />
            </div>
            <ModeSelector value={mode} onChange={handleModeSelect} />
          </div>
        )}

        {/* Step 3: Preference Form */}
        {currentStep === 3 && category && mode && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <Lumi message="Tell me a little more about what you're in the mood for…" size="sm" />
            </div>
            <div className="bg-night-900 rounded-3xl border border-night-700 p-8">
              <PreferenceForm
                category={category}
                mode={mode}
                onSubmit={handleFormSubmit}
                isLoading={isLoading}
              />
            </div>
          </div>
        )}

        {/* Step 4: Results */}
        {currentStep === 4 && (
          <div className="space-y-8 animate-fade-in">
            {tasteProfile && <TasteProfile profile={tasteProfile} />}
            
            <ResultsSection
              recommendations={recommendations}
              isLoading={isLoading}
              error={error}
              onLike={handleLike}
              onDislike={handleDislike}
              onSave={handleSave}
              onRefine={handleRefine}
            />

            <div className="mt-12">
              <RecommendationHistory />
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-20 text-center text-cream-400/60 text-sm">
          <p className="font-serif italic">Powered by OpenAI • Built with care</p>
        </footer>
      </div>
    </main>
  );
}

