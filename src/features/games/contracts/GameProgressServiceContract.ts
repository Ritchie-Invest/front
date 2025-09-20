import { CompleteModuleResponse, CompleteLessonResponse } from '../models/progress';

export interface GameProgressServiceContract {
  completeModule(
    moduleId: string,
    answer: string | boolean,
    moduleType: 'MCQ' | 'TRUE_OR_FALSE',
  ): Promise<CompleteModuleResponse>;

  completeLesson(lessonId: string): Promise<CompleteLessonResponse>;
}
