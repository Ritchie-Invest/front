// /src/features/lessons/services/lessonsService.ts
import { Chapter } from '../../../models/chapter';
import { Lesson } from '../../../models/lesson';
import { ProgressStatus } from '../../../models/status';

// Types étendus pour l'affichage
export type ChapterWithProgress = Chapter & {
  completedLessons: number;
  totalLessons: number;
  status: ProgressStatus;
};

export type LessonWithStatus = Lesson & {
  chapterId: number;
  status: ProgressStatus;
};

const mockChapters: ChapterWithProgress[] = [
  {
    id: 1,
    title: 'Chapitre 1 : Les Fondamentaux',
    description: 'Comprendre les bases absolues avant de toucher au moindre actif.',
    lessons: [],
    completedLessons: 3,
    totalLessons: 3,
    status: ProgressStatus.COMPLETED,
  },
  {
    id: 2,
    title: "Chapitre 2 : Stratégies d'Investissement",
    description: 'Apprendre les différentes approches pour investir efficacement.',
    lessons: [],
    completedLessons: 0,
    totalLessons: 4,
    status: ProgressStatus.CURRENT,
  },
  {
    id: 3,
    title: 'Chapitre 3 : Analyse Financière',
    description: "Maîtriser l'analyse des entreprises et des marchés.",
    lessons: [],
    completedLessons: 0,
    totalLessons: 5,
    status: ProgressStatus.LOCKED,
  },
  {
    id: 4,
    title: 'Chapitre 4 : Investissement Avancé',
    description: 'Techniques avancées et stratégies sophistiquées.',
    lessons: [],
    completedLessons: 0,
    totalLessons: 6,
    status: ProgressStatus.LOCKED,
  },
];

const mockLessons: LessonWithStatus[] = [
  // Chapitre 1
  {
    id: 11,
    chapterId: 1,
    title: 'Épargne vs Investissement',
    description: 'Comprendre la différence entre épargner et investir.',
    games: [],
    status: ProgressStatus.COMPLETED,
  },
  {
    id: 12,
    chapterId: 1,
    title: "Les Types d'Actifs",
    description: "Découvrir les différents types d'investissements disponibles.",
    games: [],
    status: ProgressStatus.COMPLETED,
  },
  {
    id: 13,
    chapterId: 1,
    title: 'Le Risque et le Rendement',
    description: 'Comprendre la relation fondamentale entre risque et rendement.',
    games: [],
    status: ProgressStatus.COMPLETED,
  },
  // Chapitre 2
  {
    id: 21,
    chapterId: 2,
    title: 'Diversification du Portefeuille',
    description: 'Apprendre à répartir ses investissements pour réduire les risques.',
    games: [],
    status: ProgressStatus.CURRENT,
  },
  {
    id: 22,
    chapterId: 2,
    title: 'Investissement Passif vs Actif',
    description: "Comparer les stratégies d'investissement passives et actives.",
    games: [],
    status: ProgressStatus.LOCKED,
  },
  {
    id: 23,
    chapterId: 2,
    title: 'Les ETF et Fonds Indiciels',
    description: 'Comprendre les fonds négociés en bourse et leur utilité.',
    games: [],
    status: ProgressStatus.LOCKED,
  },
  {
    id: 24,
    chapterId: 2,
    title: 'Rééquilibrage du Portefeuille',
    description: "Maintenir l'allocation d'actifs souhaitée au fil du temps.",
    games: [],
    status: ProgressStatus.LOCKED,
  },
  // Chapitre 3
  {
    id: 31,
    chapterId: 3,
    title: 'Analyse Fondamentale',
    description: 'Évaluer la valeur intrinsèque des entreprises.',
    games: [],
    status: ProgressStatus.LOCKED,
  },
  {
    id: 32,
    chapterId: 3,
    title: 'Ratios Financiers',
    description: 'Interpréter les indicateurs clés de performance financière.',
    games: [],
    status: ProgressStatus.LOCKED,
  },
];

export const lessonsService = {
  getChaptersWithProgress: (): ChapterWithProgress[] => {
    return mockChapters;
  },

  getAllLessons: (): LessonWithStatus[] => {
    return mockLessons;
  },

  getLessonsByChapter: (chapterId: number): LessonWithStatus[] => {
    return mockLessons.filter((lesson) => lesson.chapterId === chapterId);
  },

  getChapterById: (chapterId: number): ChapterWithProgress | undefined => {
    return mockChapters.find((chapter) => chapter.id === chapterId);
  },

  getLessonById: (lessonId: number): LessonWithStatus | undefined => {
    return mockLessons.find((lesson) => lesson.id === lessonId);
  },
};
