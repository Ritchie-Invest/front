import { GameProgressServiceAdapter } from '../adapters/GameProgressServiceAdapter';

const gameProgressServiceAdapter = new GameProgressServiceAdapter();

export const gameProgressService = {
  async completeModule(
    moduleId: string,
    answer: string | boolean,
    moduleType: 'MCQ' | 'TRUE_OR_FALSE' | 'FILL_IN_THE_BLANK',
  ) {
    return gameProgressServiceAdapter.completeModule(moduleId, answer, moduleType);
  },

  async completeLesson(lessonId: string) {
    return gameProgressServiceAdapter.completeLesson(lessonId);
  },
};
