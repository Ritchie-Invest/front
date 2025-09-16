import { ChaptersAndLessonsResponse } from '../models/responses/chapter';

export interface ProgressContract {
  getUserProgress(): Promise<ChaptersAndLessonsResponse>;
}
