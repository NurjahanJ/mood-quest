// ─── Mood Board Types ───────────────────────────────────────────────

export type BoardCategory = 'game' | 'movie';

export interface ColorSwatch {
  hex: string;
  name: string;
}

export interface SimilarVibe {
  title: string;
  category: 'game' | 'movie' | 'music' | 'art' | 'book';
}

export interface MoodBoard {
  title: string;
  category: BoardCategory;
  tagline: string;
  colorPalette: ColorSwatch[];
  aestheticTags: string[];
  coreEmotions: string[];
  atmosphere: string;
  soundtrackMood: string;
  bestSetting: string;
  textures: string[];
  similarVibes: SimilarVibe[];
}

export interface GenerateBoardRequest {
  title: string;
  category: BoardCategory;
}

export interface GenerateBoardResponse {
  board: MoodBoard;
}

// ─── Recommendation System Types ────────────────────────────────────

export type RecommendationType = 'games' | 'movies';

export type RecommendationMode = 'Quick Match' | 'Deep Match' | 'Surprise Me';

export type Mood =
  | 'Relaxing' | 'Cozy' | 'Competitive' | 'Story-driven'
  | 'Strategic' | 'Chaotic' | 'Comforting' | 'Funny'
  | 'Emotional' | 'Suspenseful' | 'Thought-provoking'
  | 'Adventurous' | 'Romantic' | 'Dark';

export type TimeAvailable =
  | 'Under 30 minutes' | 'About 1 hour' | 'Several hours'
  | 'Under 90 minutes' | 'About 2 hours' | 'Long movie is okay';

export type Platform = 'PC' | 'Nintendo Switch' | 'PlayStation' | 'Xbox' | 'Mobile';

export type StreamingPlatform = 'Netflix' | 'Amazon Prime' | 'Disney+' | 'HBO Max' | 'Hulu' | 'Apple TV+' | 'Any';

export type PlayStyle = 'Solo' | 'Co-op' | 'Multiplayer' | 'Either';

export type Genre = 'RPG' | 'Puzzle' | 'Simulation' | 'Adventure' | 'Action' | 'Strategy' | 'No preference';

export type MovieGenre = 'Drama' | 'Comedy' | 'Thriller' | 'Sci-Fi' | 'Romance' | 'Documentary' | 'Animation' | 'No preference';

export interface UserPreferences {
  type?: RecommendationType;
  mode?: RecommendationMode;
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
  id: string;
  category: 'game';
  title: string;
  whyItFits: string;
  moodMatch: string;
  timeFit: string;
  platformFit: string;
  playStyleFit?: string;
  genreFit?: string;
  similarGames: string[];
  confidence: number;
  scores?: {
    mood: number;
    time: number;
    platform: number;
    genre: number;
    overall: number;
  };
}

export interface MovieRecommendation {
  id: string;
  category: 'movie';
  title: string;
  year?: number;
  whyItFits: string;
  moodMatch: string;
  timeFit: string;
  platformFit: string;
  watchStyleFit?: string;
  contentTone?: string;
  genreFit?: string;
  similarMovies: string[];
  confidence: number;
  scores?: {
    mood: number;
    time: number;
    genre: number;
    overall: number;
  };
}

export interface RecommendationResponse {
  recommendations: (GameRecommendation | MovieRecommendation)[];
}

