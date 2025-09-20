import { axiosInstance } from '../../../lib/api/axios';
import { CompleteModuleResponse, CompleteLessonResponse } from '../models/progress';
import { GameProgressServiceContract } from '../contracts/GameProgressServiceContract';

export class GameProgressServiceAdapter implements GameProgressServiceContract {
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

    const response = await axiosInstance.post(`/modules/${moduleId}/complete`, payload);

    return response.data;
  }

  async completeLesson(lessonId: string): Promise<CompleteLessonResponse> {
    const response = await axiosInstance.post(`/lessons/${lessonId}/complete`);
    return response.data;
  }
}
