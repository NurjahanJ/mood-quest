export type Mood = 'Relaxing' | 'Cozy' | 'Competitive' | 'Story-driven' | 'Strategic' | 'Chaotic';

export type TimeAvailable = 'Under 30 minutes' | 'About 1 hour' | 'Several hours';

export type Platform = 'PC' | 'Nintendo Switch' | 'PlayStation' | 'Xbox' | 'Mobile';

export type PlayStyle = 'Solo' | 'Co-op' | 'Multiplayer' | 'Either';

export type Genre = 'RPG' | 'Puzzle' | 'Simulation' | 'Adventure' | 'Action' | 'Strategy' | 'No preference';

export interface UserPreferences {
  mood: Mood;
  timeAvailable: TimeAvailable;
  platform: Platform;
  playStyle: PlayStyle;
  preferredGenre?: Genre;
  avoid?: string[];
}

export interface GameRecommendation {
  title: string;
  whyItFits: string;
  moodMatch: string;
  timeFit: string;
  platformFit: string;
  similarGames: string[];
  confidence: number;
}

export interface RecommendationResponse {
  recommendations: GameRecommendation[];
}
