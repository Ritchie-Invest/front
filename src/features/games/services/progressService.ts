import { ProgressAdapter } from '../adapters/ProgressAdapter';

const progressAdapter = new ProgressAdapter();

export const gameProgressService = {
  async completeModule(
    moduleId: string,
    answer: string | boolean,
    moduleType: 'MCQ' | 'TRUE_OR_FALSE' | 'FILL_IN_THE_BLANK',
  ) {
    return progressAdapter.completeModule(moduleId, answer, moduleType);
  },

  async completeLesson(lessonId: string) {
    return progressAdapter.completeLesson(lessonId);
  },
};
