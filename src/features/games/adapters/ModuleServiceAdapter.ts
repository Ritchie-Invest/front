import { axiosInstance } from '../../../lib/api/axios';
import { QCMModule } from '../models/qcmModule';
import { TrueFalseModule } from '../models/trueFalseModule';
import { ModuleServiceContract } from '../contracts/ModuleServiceContract';
import { isQCMModule } from '../utils/moduleTypeGuards';

export class ModuleServiceAdapter implements ModuleServiceContract {
  async getModule(moduleId: string): Promise<QCMModule | TrueFalseModule> {
    const response = await axiosInstance.get(`/modules/${moduleId}`);
    const data = response.data;

    const moduleType = isQCMModule(data) ? 'MCQ' : 'TRUE_OR_FALSE';

    if (moduleType === 'TRUE_OR_FALSE') {
      return {
        id: data.id,
        lessonId: data.lessonId,
        details: {
          question: data.details.sentence || data.details.question || '',
          isTrue: data.details.isTrue ?? data.details.choices?.[0]?.isCorrect ?? true,
        },
        updatedAt: data.updatedAt,
        createdAt: data.createdAt,
      } as TrueFalseModule;
    }

    return data as QCMModule;
  }
}
