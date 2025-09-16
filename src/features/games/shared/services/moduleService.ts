import { axiosInstance } from '../../../../lib/api/axios';
import { QCMModule } from '../../qcm/models/module';
import { TrueFalseModule } from '../../true-false/models/module';
import { isQCMModule } from '../utils/moduleTypeGuards';

interface ModuleResponse {
  id: string;
  lessonId?: string;
  details: {
    question?: string;
    sentence?: string;
    choices?: Array<{
      id: string;
      text: string;
      isCorrect: boolean;
      correctionMessage?: string;
    }>;
    isTrue?: boolean;
  };
  updatedAt?: string;
  createdAt?: string;
}

export const moduleService = {
  async getModule(moduleId: string): Promise<QCMModule | TrueFalseModule> {
    const response = await axiosInstance.get<ModuleResponse>(`/modules/${moduleId}`);
    const data = response.data;

    // Détection du type selon la structure des données
    const moduleType = isQCMModule(data) ? 'MCQ' : 'TRUE_OR_FALSE';

    if (moduleType === 'TRUE_OR_FALSE') {
      // Retourner le format TrueFalse
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

    // Sinon retourner le format QCM
    return data as QCMModule;
  },
};
