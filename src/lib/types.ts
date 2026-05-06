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

