/**
 * FILE: movieDataset.ts
 * PURPOSE: Curated movie database for fallback recommendations
 * 
 * STRUCTURE:
 * Each movie includes:
 * - id: unique identifier
 * - title: movie name
 * - moods: array of matching moods
 * - genres: movie genres
 * - watchStyles: viewing contexts
 * - timeFits: runtime categories
 * - avoidTags: content warnings
 * - contentTone: overall feel
 * - similarTitles: related movies
 * 
 * DEPENDENCIES:
 * - None (pure data)
 * 
 * USED BY:
 * - scoring.ts (for calculating match scores)
 * - fallbackRecommendations.ts (for generating recommendations)
 * 
 * STATUS: Complete
 * DO NOT MODIFY: Yes (unless adding more movies)
 * REASON: Scoring algorithm depends on this structure
 */

export interface MovieDataItem {
  id: string;
  title: string;
  year?: number;
  moods: string[];
  genres: string[];
  watchStyles: string[];
  timeFits: string[];
  avoidTags: string[];
  contentTone: string;
  similarTitles: string[];
}

export const movieDataset: MovieDataItem[] = [
  {
    id: 'paddington-2',
    title: 'Paddington 2',
    year: 2017,
    moods: ['Comforting', 'Funny'],
    genres: ['Comedy', 'Fantasy'],
    watchStyles: ['Light', 'Family-friendly'],
    timeFits: ['Under 90 minutes', 'About 2 hours'],
    avoidTags: [],
    contentTone: 'Heartwarming and wholesome',
    similarTitles: ['Paddington', 'Fantastic Mr. Fox', 'The Grand Budapest Hotel']
  },
  {
    id: 'spider-verse',
    title: 'Spider-Man: Into the Spider-Verse',
    year: 2018,
    moods: ['Adventurous', 'Funny'],
    genres: ['Animation', 'Action'],
    watchStyles: ['Engaging', 'Visually stunning'],
    timeFits: ['Under 90 minutes', 'About 2 hours'],
    avoidTags: ['violence'],
    contentTone: 'Energetic and inspiring',
    similarTitles: ['The Mitchells vs. The Machines', 'Big Hero 6', 'Raya and the Last Dragon']
  },
  {
    id: 'grand-budapest-hotel',
    title: 'The Grand Budapest Hotel',
    year: 2014,
    moods: ['Thought-provoking', 'Funny'],
    genres: ['Comedy', 'Drama'],
    watchStyles: ['Artistic', 'Quirky'],
    timeFits: ['Under 90 minutes', 'About 2 hours'],
    avoidTags: ['violence'],
    contentTone: 'Whimsical and stylized',
    similarTitles: ['Fantastic Mr. Fox', 'Moonrise Kingdom', 'The French Dispatch']
  },
  {
    id: 'knives-out',
    title: 'Knives Out',
    year: 2019,
    moods: ['Suspenseful', 'Funny'],
    genres: ['Thriller', 'Comedy'],
    watchStyles: ['Engaging', 'Clever'],
    timeFits: ['About 2 hours', 'Long movie is okay'],
    avoidTags: ['violence'],
    contentTone: 'Witty and entertaining',
    similarTitles: ['Glass Onion', 'Murder on the Orient Express', 'Clue']
  },
  {
    id: 'princess-bride',
    title: 'The Princess Bride',
    year: 1987,
    moods: ['Comforting', 'Funny', 'Adventurous'],
    genres: ['Fantasy', 'Romance', 'Comedy'],
    watchStyles: ['Classic', 'Family-friendly'],
    timeFits: ['Under 90 minutes', 'About 2 hours'],
    avoidTags: [],
    contentTone: 'Charming and quotable',
    similarTitles: ['Stardust', 'Ella Enchanted', 'The NeverEnding Story']
  },
  {
    id: 'everything-everywhere',
    title: 'Everything Everywhere All at Once',
    year: 2022,
    moods: ['Emotional', 'Thought-provoking', 'Funny'],
    genres: ['Sci-Fi', 'Comedy', 'Drama'],
    watchStyles: ['Mind-bending', 'Unique'],
    timeFits: ['About 2 hours', 'Long movie is okay'],
    avoidTags: ['violence'],
    contentTone: 'Chaotic and heartfelt',
    similarTitles: ['Swiss Army Man', 'Eternal Sunshine', 'The Matrix']
  },
  {
    id: 'spirited-away',
    title: 'Spirited Away',
    year: 2001,
    moods: ['Adventurous', 'Thought-provoking'],
    genres: ['Animation', 'Fantasy'],
    watchStyles: ['Artistic', 'Immersive'],
    timeFits: ['About 2 hours'],
    avoidTags: [],
    contentTone: 'Magical and contemplative',
    similarTitles: ["Howl's Moving Castle", 'Princess Mononoke', 'My Neighbor Totoro']
  },
  {
    id: 'social-network',
    title: 'The Social Network',
    year: 2010,
    moods: ['Thought-provoking', 'Suspenseful'],
    genres: ['Drama'],
    watchStyles: ['Fast-paced', 'Dialogue-heavy'],
    timeFits: ['About 2 hours'],
    avoidTags: [],
    contentTone: 'Sharp and intense',
    similarTitles: ['Steve Jobs', 'Moneyball', 'The Big Short']
  },
  {
    id: 'interstellar',
    title: 'Interstellar',
    year: 2014,
    moods: ['Thought-provoking', 'Emotional', 'Adventurous'],
    genres: ['Sci-Fi', 'Drama'],
    watchStyles: ['Epic', 'Immersive'],
    timeFits: ['Long movie is okay'],
    avoidTags: [],
    contentTone: 'Grand and emotional',
    similarTitles: ['Arrival', 'Gravity', 'The Martian']
  },
  {
    id: 'legally-blonde',
    title: 'Legally Blonde',
    year: 2001,
    moods: ['Comforting', 'Funny'],
    genres: ['Comedy', 'Romance'],
    watchStyles: ['Light', 'Feel-good'],
    timeFits: ['Under 90 minutes', 'About 2 hours'],
    avoidTags: [],
    contentTone: 'Uplifting and fun',
    similarTitles: ['Clueless', 'Mean Girls', 'Easy A']
  },
  {
    id: 'little-women',
    title: 'Little Women',
    year: 2019,
    moods: ['Emotional', 'Comforting'],
    genres: ['Drama', 'Romance'],
    watchStyles: ['Period piece', 'Character-driven'],
    timeFits: ['About 2 hours', 'Long movie is okay'],
    avoidTags: [],
    contentTone: 'Warm and nostalgic',
    similarTitles: ['Pride and Prejudice', 'Emma', 'Sense and Sensibility']
  },
  {
    id: 'the-martian',
    title: 'The Martian',
    year: 2015,
    moods: ['Adventurous', 'Funny', 'Thought-provoking'],
    genres: ['Sci-Fi', 'Drama'],
    watchStyles: ['Problem-solving', 'Optimistic'],
    timeFits: ['About 2 hours', 'Long movie is okay'],
    avoidTags: [],
    contentTone: 'Hopeful and clever',
    similarTitles: ['Interstellar', 'Gravity', 'Apollo 13']
  },
  {
    id: 'coco',
    title: 'Coco',
    year: 2017,
    moods: ['Emotional', 'Comforting'],
    genres: ['Animation', 'Fantasy'],
    watchStyles: ['Family-friendly', 'Colorful'],
    timeFits: ['Under 90 minutes', 'About 2 hours'],
    avoidTags: [],
    contentTone: 'Heartwarming and vibrant',
    similarTitles: ['Encanto', 'Moana', 'Soul']
  },
  {
    id: 'la-la-land',
    title: 'La La Land',
    year: 2016,
    moods: ['Romantic', 'Emotional'],
    genres: ['Romance', 'Drama'],
    watchStyles: ['Musical', 'Visually stunning'],
    timeFits: ['About 2 hours'],
    avoidTags: ['sad ending'],
    contentTone: 'Bittersweet and beautiful',
    similarTitles: ['Whiplash', 'A Star is Born', 'The Greatest Showman']
  },
  {
    id: 'arrival',
    title: 'Arrival',
    year: 2016,
    moods: ['Thought-provoking', 'Emotional', 'Suspenseful'],
    genres: ['Sci-Fi', 'Drama'],
    watchStyles: ['Cerebral', 'Slow-burn'],
    timeFits: ['About 2 hours'],
    avoidTags: [],
    contentTone: 'Contemplative and moving',
    similarTitles: ['Interstellar', 'Contact', 'Blade Runner 2049']
  },
  {
    id: 'fantastic-mr-fox',
    title: 'Fantastic Mr. Fox',
    year: 2009,
    moods: ['Funny', 'Comforting'],
    genres: ['Animation', 'Comedy'],
    watchStyles: ['Quirky', 'Artistic'],
    timeFits: ['Under 90 minutes'],
    avoidTags: [],
    contentTone: 'Charming and witty',
    similarTitles: ['The Grand Budapest Hotel', 'Isle of Dogs', 'Paddington']
  },
  {
    id: 'truman-show',
    title: 'The Truman Show',
    year: 1998,
    moods: ['Thought-provoking', 'Suspenseful'],
    genres: ['Sci-Fi', 'Drama'],
    watchStyles: ['Philosophical', 'Unique'],
    timeFits: ['Under 90 minutes', 'About 2 hours'],
    avoidTags: [],
    contentTone: 'Thought-provoking and unsettling',
    similarTitles: ['Eternal Sunshine', 'Being John Malkovich', 'The Matrix']
  },
  {
    id: 'hidden-figures',
    title: 'Hidden Figures',
    year: 2016,
    moods: ['Thought-provoking', 'Comforting'],
    genres: ['Drama'],
    watchStyles: ['Inspiring', 'Historical'],
    timeFits: ['About 2 hours'],
    avoidTags: [],
    contentTone: 'Uplifting and important',
    similarTitles: ['The Imitation Game', 'A Beautiful Mind', 'The Theory of Everything']
  },
  {
    id: 'school-of-rock',
    title: 'School of Rock',
    year: 2003,
    moods: ['Funny', 'Comforting'],
    genres: ['Comedy'],
    watchStyles: ['Feel-good', 'Music-focused'],
    timeFits: ['Under 90 minutes', 'About 2 hours'],
    avoidTags: [],
    contentTone: 'Fun and energetic',
    similarTitles: ['Almost Famous', 'Sing Street', 'High Fidelity']
  },
  {
    id: 'howls-moving-castle',
    title: "Howl's Moving Castle",
    year: 2004,
    moods: ['Adventurous', 'Romantic', 'Comforting'],
    genres: ['Animation', 'Fantasy'],
    watchStyles: ['Whimsical', 'Artistic'],
    timeFits: ['About 2 hours'],
    avoidTags: [],
    contentTone: 'Magical and romantic',
    similarTitles: ['Spirited Away', 'Kiki\'s Delivery Service', 'Castle in the Sky']
  },
  {
    id: 'parasite',
    title: 'Parasite',
    year: 2019,
    moods: ['Suspenseful', 'Thought-provoking', 'Dark'],
    genres: ['Thriller', 'Drama'],
    watchStyles: ['Intense', 'Unpredictable'],
    timeFits: ['About 2 hours', 'Long movie is okay'],
    avoidTags: ['violence'],
    contentTone: 'Dark and gripping',
    similarTitles: ['Memories of Murder', 'Burning', 'The Handmaiden']
  },
  {
    id: 'encanto',
    title: 'Encanto',
    year: 2021,
    moods: ['Comforting', 'Emotional', 'Funny'],
    genres: ['Animation', 'Fantasy'],
    watchStyles: ['Musical', 'Family-friendly'],
    timeFits: ['Under 90 minutes', 'About 2 hours'],
    avoidTags: [],
    contentTone: 'Vibrant and heartfelt',
    similarTitles: ['Coco', 'Moana', 'Tangled']
  },
  {
    id: 'get-out',
    title: 'Get Out',
    year: 2017,
    moods: ['Suspenseful', 'Dark', 'Thought-provoking'],
    genres: ['Horror', 'Thriller'],
    watchStyles: ['Tense', 'Social commentary'],
    timeFits: ['Under 90 minutes', 'About 2 hours'],
    avoidTags: ['horror', 'violence'],
    contentTone: 'Disturbing and clever',
    similarTitles: ['Us', 'Nope', 'Midsommar']
  },
  {
    id: 'soul',
    title: 'Soul',
    year: 2020,
    moods: ['Thought-provoking', 'Emotional', 'Comforting'],
    genres: ['Animation', 'Fantasy'],
    watchStyles: ['Philosophical', 'Artistic'],
    timeFits: ['Under 90 minutes', 'About 2 hours'],
    avoidTags: [],
    contentTone: 'Contemplative and uplifting',
    similarTitles: ['Inside Out', 'Coco', 'WALL-E']
  }
];
