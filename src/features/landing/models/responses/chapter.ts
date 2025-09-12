import { Lesson } from './lesson';
import { ChapterStatus } from '../../types/ChapterStatus';

export interface Chapter {
  id: string;
  title: string;
  description: string;
  order: number;
  status: ChapterStatus;
  completedLessons: number;
  totalLessons: number;
  lessons: Lesson[];
}

export interface ChaptersAndLessonsResponse {
  chapters: Chapter[];
}
