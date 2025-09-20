import { CompleteModuleResponse, CompleteLessonResponse } from '../models/progress';
import { ModuleType } from '../types/moduleTypes';

export interface GameProgressServiceContract {
  completeModule(
    moduleId: string,
    answer: string | boolean,
    moduleType: ModuleType,
  ): Promise<CompleteModuleResponse>;

  completeLesson(lessonId: string): Promise<CompleteLessonResponse>;
}
