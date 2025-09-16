import { axiosInstance } from '../../../../lib/api/axios';
import { CompleteModuleResponse, CompleteLessonResponse } from '../models/progress';

export const gameProgressService = {
  // Completion d'un module avec réponse adaptée selon le type
  async completeModule(
    moduleId: string,
    answer: string | boolean,
    moduleType: 'MCQ' | 'TRUE_OR_FALSE',
  ): Promise<CompleteModuleResponse> {
    const payload =
      moduleType === 'MCQ'
        ? {
            gameType: 'MCQ',
            mcq: { choiceId: answer as string },
          }
        : {
            gameType: 'TRUE_OR_FALSE',
            trueOrFalse: { answer: answer as boolean },
          };

    const response = await axiosInstance.post<CompleteModuleResponse>(
      `/modules/${moduleId}/complete`,
      payload,
    );
    return response.data;
  },

  // Completion finale d'une leçon et calcul des XP
  async completeLesson(lessonId: string): Promise<CompleteLessonResponse> {
    const response = await axiosInstance.post<CompleteLessonResponse>(
      `/lessons/${lessonId}/complete`,
    );
    return response.data;
  },
};
