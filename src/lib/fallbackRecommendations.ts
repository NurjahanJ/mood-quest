import { UserPreferences, GameRecommendation } from './types';

export function getFallbackRecommendations(preferences: UserPreferences): GameRecommendation[] {
  const { mood, preferredGenre } = preferences;

  const recommendationMap: Record<string, GameRecommendation[]> = {
    'Relaxing': [
      {
        title: 'Stardew Valley',
        whyItFits: 'Perfect for unwinding with gentle farming and relationship-building at your own pace.',
        moodMatch: 'Calming gameplay with no pressure or time limits',
        timeFit: 'Can be played in short sessions or long stretches',
        platformFit: 'Available on all major platforms',
        similarGames: ['Animal Crossing', 'Spiritfarer', 'A Short Hike'],
        confidence: 95,
      },
      {
        title: 'Journey',
        whyItFits: 'A meditative experience with beautiful visuals and soothing music.',
        moodMatch: 'Peaceful exploration with emotional depth',
        timeFit: 'Complete in one sitting or take breaks',
        platformFit: 'Available on PlayStation and PC',
        similarGames: ['ABZÛ', 'Flower', 'Gris'],
        confidence: 90,
      },
      {
        title: 'Unpacking',
        whyItFits: 'Zen-like puzzle game about organizing belongings in a new home.',
        moodMatch: 'Satisfying and stress-free',
        timeFit: 'Perfect for short relaxing sessions',
        platformFit: 'Available on most platforms',
        similarGames: ['A Little to the Left', 'Townscaper', 'Dorfromantik'],
        confidence: 88,
      },
    ],
    'Cozy': [
      {
        title: 'Animal Crossing: New Horizons',
        whyItFits: 'The ultimate cozy game with island customization and friendly neighbors.',
        moodMatch: 'Warm, inviting world with no fail states',
        timeFit: 'Designed for daily short sessions',
        platformFit: 'Nintendo Switch exclusive',
        similarGames: ['Stardew Valley', 'Cozy Grove', 'Ooblets'],
        confidence: 96,
      },
      {
        title: 'Spiritfarer',
        whyItFits: 'Heartwarming management game about caring for spirits on their final journey.',
        moodMatch: 'Emotionally comforting with beautiful art',
        timeFit: 'Flexible pacing',
        platformFit: 'Available on all platforms',
        similarGames: ['Gris', 'Haven', 'Coffee Talk'],
        confidence: 92,
      },
      {
        title: 'A Short Hike',
        whyItFits: 'Charming exploration game set in a peaceful mountain park.',
        moodMatch: 'Wholesome and uplifting',
        timeFit: 'Can be completed in under 2 hours',
        platformFit: 'PC and Nintendo Switch',
        similarGames: ['Firewatch', 'Alba: A Wildlife Adventure', 'Unpacking'],
        confidence: 89,
      },
    ],
    'Competitive': [
      {
        title: 'Rocket League',
        whyItFits: 'Fast-paced car soccer with high skill ceiling and intense matches.',
        moodMatch: 'Pure competitive adrenaline',
        timeFit: 'Matches are 5-10 minutes',
        platformFit: 'Available on all platforms with cross-play',
        similarGames: ['Valorant', 'Apex Legends', 'Street Fighter 6'],
        confidence: 94,
      },
      {
        title: 'Super Smash Bros. Ultimate',
        whyItFits: 'Iconic fighting game with endless competitive depth.',
        moodMatch: 'Intense skill-based combat',
        timeFit: 'Quick matches or tournament play',
        platformFit: 'Nintendo Switch exclusive',
        similarGames: ['Guilty Gear Strive', 'Tekken 8', 'Brawlhalla'],
        confidence: 93,
      },
      {
        title: 'StarCraft II',
        whyItFits: 'The pinnacle of competitive real-time strategy.',
        moodMatch: 'Demanding strategic competition',
        timeFit: 'Matches vary from 10-40 minutes',
        platformFit: 'PC only',
        similarGames: ['Age of Empires IV', 'Warcraft III', 'Company of Heroes'],
        confidence: 91,
      },
    ],
    'Story-driven': [
      {
        title: 'The Last of Us Part I',
        whyItFits: 'Masterful narrative with unforgettable characters and emotional depth.',
        moodMatch: 'Gripping story with powerful performances',
        timeFit: 'Best experienced in long sessions',
        platformFit: 'PlayStation and PC',
        similarGames: ['God of War', 'Red Dead Redemption 2', 'Horizon Zero Dawn'],
        confidence: 97,
      },
      {
        title: 'Disco Elysium',
        whyItFits: 'Revolutionary RPG with incredible writing and branching narratives.',
        moodMatch: 'Deep, thought-provoking storytelling',
        timeFit: 'Can be played at your own pace',
        platformFit: 'Available on all platforms',
        similarGames: ['Baldur\'s Gate 3', 'Planescape: Torment', 'Divinity: Original Sin 2'],
        confidence: 95,
      },
      {
        title: 'What Remains of Edith Finch',
        whyItFits: 'Stunning narrative experience exploring a family\'s mysterious history.',
        moodMatch: 'Emotionally resonant storytelling',
        timeFit: 'Completable in 2-3 hours',
        platformFit: 'Available on most platforms',
        similarGames: ['Gone Home', 'Firewatch', 'The Vanishing of Ethan Carter'],
        confidence: 90,
      },
    ],
    'Strategic': [
      {
        title: 'Civilization VI',
        whyItFits: 'Deep turn-based strategy where you build an empire across history.',
        moodMatch: 'Satisfying long-term planning and decision-making',
        timeFit: 'Highly flexible, save anytime',
        platformFit: 'Available on all platforms',
        similarGames: ['Crusader Kings III', 'Total War: Warhammer III', 'XCOM 2'],
        confidence: 96,
      },
      {
        title: 'Into the Breach',
        whyItFits: 'Tactical perfection in bite-sized strategic battles.',
        moodMatch: 'Pure strategic thinking with no randomness',
        timeFit: 'Perfect for short sessions',
        platformFit: 'PC and Nintendo Switch',
        similarGames: ['Slay the Spire', 'FTL', 'Advance Wars'],
        confidence: 93,
      },
      {
        title: 'Factorio',
        whyItFits: 'Build and optimize automated factories in this engineering masterpiece.',
        moodMatch: 'Deep strategic planning and optimization',
        timeFit: 'Extremely flexible pacing',
        platformFit: 'PC only',
        similarGames: ['Satisfactory', 'Dyson Sphere Program', 'Oxygen Not Included'],
        confidence: 91,
      },
    ],
    'Chaotic': [
      {
        title: 'Overcooked! 2',
        whyItFits: 'Frantic cooperative cooking that descends into hilarious chaos.',
        moodMatch: 'Pure controlled chaos and laughter',
        timeFit: 'Perfect for short bursts',
        platformFit: 'Available on all platforms',
        similarGames: ['Moving Out', 'Gang Beasts', 'Fall Guys'],
        confidence: 95,
      },
      {
        title: 'DOOM Eternal',
        whyItFits: 'Relentless high-speed demon-slaying action.',
        moodMatch: 'Intense chaotic combat',
        timeFit: 'Missions are 20-40 minutes',
        platformFit: 'Available on all platforms',
        similarGames: ['Hades', 'Devil May Cry 5', 'Ultrakill'],
        confidence: 92,
      },
      {
        title: 'Risk of Rain 2',
        whyItFits: 'Chaotic roguelike where runs escalate into beautiful mayhem.',
        moodMatch: 'Escalating chaos and power fantasy',
        timeFit: 'Runs last 30-60 minutes',
        platformFit: 'Available on all platforms',
        similarGames: ['Vampire Survivors', 'Enter the Gungeon', 'Binding of Isaac'],
        confidence: 89,
      },
    ],
  };

  let recommendations = recommendationMap[mood] || recommendationMap['Relaxing'];

  if (preferredGenre && preferredGenre !== 'No preference') {
    recommendations = recommendations.map(rec => ({
      ...rec,
      confidence: rec.confidence - 5,
    }));
  }

  return recommendations;
}
