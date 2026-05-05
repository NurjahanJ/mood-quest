export type RecommendationType = 'games' | 'movies';

export type Mood = 'Relaxing' | 'Cozy' | 'Competitive' | 'Story-driven' | 'Strategic' | 'Chaotic';

export type TimeAvailable = 'Under 30 minutes' | 'About 1 hour' | 'Several hours';

export type Platform = 'PC' | 'Nintendo Switch' | 'PlayStation' | 'Xbox' | 'Mobile';

export type StreamingPlatform = 'Netflix' | 'Amazon Prime' | 'Disney+' | 'HBO Max' | 'Hulu' | 'Apple TV+' | 'Any';

export type PlayStyle = 'Solo' | 'Co-op' | 'Multiplayer' | 'Either';

export type Genre = 'RPG' | 'Puzzle' | 'Simulation' | 'Adventure' | 'Action' | 'Strategy' | 'No preference';

export type MovieGenre = 'Drama' | 'Comedy' | 'Thriller' | 'Sci-Fi' | 'Romance' | 'Documentary' | 'Animation' | 'No preference';

export interface UserPreferences {
  type: RecommendationType;
  mood: Mood;
  timeAvailable: TimeAvailable;
  platform?: Platform;
  streamingPlatform?: StreamingPlatform;
  playStyle?: PlayStyle;
  preferredGenre?: Genre;
  preferredMovieGenre?: MovieGenre;
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

export interface MovieRecommendation {
  title: string;
  whyItFits: string;
  moodMatch: string;
  timeFit: string;
  platformFit: string;
  similarMovies: string[];
  confidence: number;
  year?: number;
}

export interface RecommendationResponse {
  recommendations: (GameRecommendation | MovieRecommendation)[];
  type: RecommendationType;
}
