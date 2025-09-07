import { ProgressContract } from '../contracts/ProgressContract';
import { progressService } from '../services/progressService';
import { ChaptersAndLessonsResponse } from '../models/responses/chapter';
import {
  validateProgressData,
  validateProgressDataConsistency,
} from '../validation/ProgressValidation';

export class ProgressServiceAdapter implements ProgressContract {
  async getUserProgress(): Promise<ChaptersAndLessonsResponse> {
    try {
      const data = await progressService.getUserProgress();

      if (!validateProgressData(data)) {
        throw new Error('Invalid progress data structure received from service');
      }

      if (!validateProgressDataConsistency(data)) {
        throw new Error('Progress data consistency validation failed');
      }

      return data;
    } catch (error) {
      console.error('ProgressServiceAdapter: Error fetching user progress:', error);

      if (error instanceof Error) {
        if (error.message.includes('Network Error') || error.message.includes('fetch')) {
          throw new Error('Unable to fetch progress data. Please check your internet connection.');
        }

        if (error.message.includes('Invalid') || error.message.includes('validation')) {
          throw error;
        }
      }

      throw new Error('An unexpected error occurred while fetching progress data');
    }
  }
}
