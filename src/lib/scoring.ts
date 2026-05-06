import { UserPreferences, GameRecommendation, MovieRecommendation } from './types';
import { GameDataItem } from './gameDataset';
import { MovieDataItem } from './movieDataset';

const WEIGHTS = {
  'Quick Match': { mood: 0.3, time: 0.4, platform: 0.2, genre: 0.1 },
  'Deep Match': { mood: 0.4, time: 0.2, platform: 0.2, genre: 0.2 },
  'Surprise Me': { mood: 0.25, time: 0.25, platform: 0.25, genre: 0.25 },
};

function calculateMoodScore(itemMoods: string[], userMood: string): number {
  if (itemMoods.includes(userMood)) return 100;
  if (itemMoods.length > 0) return 50;
  return 30;
}

function calculateTimeScore(itemTimes: string[], userTime: string): number {
  if (itemTimes.includes(userTime)) return 100;
  if (itemTimes.length > 0) return 60;
  return 20;
}

function calculatePlatformScore(platforms: string[], userPlatform: string): number {
  if (platforms.includes(userPlatform)) return 100;
  if (platforms.length >= 3) return 50;
  return 0;
}

function calculateGenreScore(genres: string[], userGenre?: string): number {
  if (!userGenre || userGenre === 'No preference') return 80;
  if (genres.includes(userGenre)) return 100;
  if (genres.length > 0) return 60;
  return 40;
}

function calculateAvoidPenalty(avoidTags: string[], userAvoid: string[]): number {
  if (!userAvoid || userAvoid.length === 0) return 0;
  let penalty = 0;
  for (const tag of userAvoid) {
    if (avoidTags.some(itemTag => itemTag.toLowerCase().includes(tag.toLowerCase()))) {
      penalty += 50;
    }
  }
  return Math.min(penalty, 100);
}

export function scoreGames(games: GameDataItem[], prefs: UserPreferences): GameRecommendation[] {
  const mode = prefs.mode || 'Quick Match';
  const weights = WEIGHTS[mode as keyof typeof WEIGHTS] || WEIGHTS['Quick Match'];

  const scored = games.map(game => {
    const moodScore = calculateMoodScore(game.moods, prefs.mood);
    const timeScore = calculateTimeScore(game.timeFits, prefs.timeAvailable);
    const platformScore = calculatePlatformScore(game.platforms, prefs.platform || '');
    const genreScore = calculateGenreScore(game.genres, prefs.preferredGenre);

    let rawScore =
      (moodScore * weights.mood) +
      (timeScore * weights.time) +
      (platformScore * weights.platform) +
      (genreScore * weights.genre);

    const avoidPenalty = calculateAvoidPenalty(game.avoidTags, prefs.avoid || []);
    const finalScore = Math.max(0, rawScore - avoidPenalty);

    const confidence = mode === 'Surprise Me'
      ? Math.min(100, Math.max(0, finalScore + (Math.random() * 20 - 10)))
      : finalScore;

    return {
      game,
      confidence: Math.round(confidence),
      scores: {
        mood: Math.round(moodScore),
        time: Math.round(timeScore),
        platform: Math.round(platformScore),
        genre: Math.round(genreScore),
        overall: Math.round(finalScore),
      },
    };
  });

  const top3 = scored.sort((a, b) => b.confidence - a.confidence).slice(0, 3);

  return top3.map(item => ({
    id: item.game.id,
    category: 'game' as const,
    title: item.game.title,
    whyItFits: `This ${item.game.genres.join('/')} game matches your ${prefs.mood} mood and fits your ${prefs.timeAvailable} timeframe.`,
    moodMatch: `Matches your ${prefs.mood} mood`,
    timeFit: `Perfect for ${prefs.timeAvailable}`,
    platformFit: item.game.platforms.includes(prefs.platform || '')
      ? `Available on ${prefs.platform}`
      : `Available on ${item.game.platforms.join(', ')}`,
    playStyleFit: item.game.playStyles.includes(prefs.playStyle || '')
      ? `Supports ${prefs.playStyle} play`
      : `Supports ${item.game.playStyles.join(', ')}`,
    genreFit: item.game.genres.join(', '),
    similarGames: item.game.similarTitles,
    confidence: item.confidence,
    scores: item.scores,
  }));
}

export function scoreMovies(movies: MovieDataItem[], prefs: UserPreferences): MovieRecommendation[] {
  const mode = prefs.mode || 'Quick Match';
  const weights = WEIGHTS[mode as keyof typeof WEIGHTS] || WEIGHTS['Quick Match'];

  const scored = movies.map(movie => {
    const moodScore = calculateMoodScore(movie.moods, prefs.mood);
    const timeScore = calculateTimeScore(movie.timeFits, prefs.timeAvailable);
    const genreScore = calculateGenreScore(movie.genres, prefs.preferredMovieGenre);

    let rawScore =
      (moodScore * (weights.mood + weights.platform)) +
      (timeScore * weights.time) +
      (genreScore * weights.genre);

    const avoidPenalty = calculateAvoidPenalty(movie.avoidTags, prefs.avoid || []);
    const finalScore = Math.max(0, rawScore - avoidPenalty);

    const confidence = mode === 'Surprise Me'
      ? Math.min(100, Math.max(0, finalScore + (Math.random() * 20 - 10)))
      : finalScore;

    return {
      movie,
      confidence: Math.round(confidence),
      scores: {
        mood: Math.round(moodScore),
        time: Math.round(timeScore),
        genre: Math.round(genreScore),
        overall: Math.round(finalScore),
      },
    };
  });

  const top3 = scored.sort((a, b) => b.confidence - a.confidence).slice(0, 3);

  return top3.map(item => ({
    id: item.movie.id,
    category: 'movie' as const,
    title: item.movie.title,
    year: item.movie.year,
    whyItFits: `This ${item.movie.genres.join('/')} film matches your ${prefs.mood} mood and fits your ${prefs.timeAvailable} preference.`,
    moodMatch: `Matches your ${prefs.mood} mood`,
    timeFit: `Runtime fits ${prefs.timeAvailable}`,
    platformFit: prefs.streamingPlatform === 'Any'
      ? 'Available on multiple platforms'
      : `Check ${prefs.streamingPlatform || 'streaming'} availability`,
    watchStyleFit: item.movie.watchStyles.join(', '),
    contentTone: item.movie.contentTone,
    genreFit: item.movie.genres.join(', '),
    similarMovies: item.movie.similarTitles,
    confidence: item.confidence,
    scores: item.scores,
  }));
}
