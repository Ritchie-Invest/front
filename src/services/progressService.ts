import { axiosInstance } from '../lib/api/axios';
import { ChaptersAndLessonsResponse } from '../features/landing/models/responses/chapter';
import { CompleteModuleResponse } from '../features/games/models/progress';

export const progressService = {
  async getUserProgress(): Promise<ChaptersAndLessonsResponse> {
    const response = await axiosInstance.get<ChaptersAndLessonsResponse>('/chapters/user/progress');

    return response.data;
  },

  async completeModule(moduleId: string, choiceId: string): Promise<CompleteModuleResponse> {
    const response = await axiosInstance.post<CompleteModuleResponse>(
      `/modules/${moduleId}/complete`,
      {
        gameType: 'MCQ',
        mcq: { choiceId },
      },
    );
    return response.data;
  },
};
