import { axiosInstance } from '../../../lib/api/axios';
import { CompleteModuleResponse, CompleteLessonResponse } from '../models/progress';

export const gameProgressService = {
  // Completion d'un module avec envoi de la réponse choisie
  async completeModule(
    moduleId: string,
    choiceId: string,
    gameType: string = 'MCQ',
  ): Promise<CompleteModuleResponse> {
    const payload = {
      gameType,
      mcq: { choiceId },
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
