import { Lesson } from './lesson';

export interface Chapter {
  id: string;
  title: string;
  description: string;
  order: number;
  isUnlocked: boolean;
  completedLessons: number;
  totalLessons: number;
  lessons: Lesson[];
}

export interface ChaptersAndLessonsResponse {
  chapters: Chapter[];
}
