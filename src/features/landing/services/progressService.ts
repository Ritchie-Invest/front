import { axiosInstance } from '../../../lib/api/axios';
import { ChaptersAndLessonsResponse } from '../../landing/models/responses/chapter';

export const progressService = {
  async getUserProgress(): Promise<ChaptersAndLessonsResponse> {
    const response = await axiosInstance.get<ChaptersAndLessonsResponse>('/chapters/user/progress');

    return response.data;
  },
};
