import { Lesson } from './lesson';

export interface Chapter {
  id: number;
  title: string;
  description: string;
  lessons: Lesson[];
}
