import { LessonStatus } from '../../types/LessonStatus';

export interface Lesson {
  id: string;
  title: string;
  description: string;
  order: number;
  status: LessonStatus;
  gameModuleId: string | null;
}
