import { axiosInstance } from '../../../lib/api/axios';
import { CompleteModuleResponse, CompleteLessonResponse } from '../models/progress';
import { ProgressContract } from '../contracts/ProgressContract';
import { MODULE_TYPES, ModuleType } from '../types/moduleTypes';

export class ProgressAdapter implements ProgressContract {
  async completeModule(
    moduleId: string,
    answer: string | boolean,
    moduleType: ModuleType,
  ): Promise<CompleteModuleResponse> {
    let payload;

    if (moduleType === MODULE_TYPES.MCQ) {
      payload = {
        gameType: MODULE_TYPES.MCQ,
        mcq: { choiceId: answer as string },
      };
    } else if (moduleType === MODULE_TYPES.TRUE_OR_FALSE) {
      payload = {
        gameType: MODULE_TYPES.TRUE_OR_FALSE,
        trueOrFalse: { answer: answer as boolean },
      };
    } else {
      payload = {
        gameType: MODULE_TYPES.FILL_IN_THE_BLANK,
        fillInTheBlank: { blankId: answer as string },
      };
    }

    const response = await axiosInstance.post(`/modules/${moduleId}/complete`, payload);

    return response.data;
  }

  async completeLesson(lessonId: string): Promise<CompleteLessonResponse> {
    const response = await axiosInstance.post(`/lessons/${lessonId}/complete`);
    return response.data;
  }
}
