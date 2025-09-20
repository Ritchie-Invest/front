import { axiosInstance } from '../../../lib/api/axios';
import { QCMModule } from '../models/qcmModule';
import { TrueFalseModule } from '../models/trueFalseModule';
import { FillBlankModule } from '../models/fillBlankModule';
import { ModuleServiceContract } from '../contracts/ModuleServiceContract';
import { isTrueFalseModule, isFillBlankModule, isQCMModule } from '../utils/moduleTypeGuards';

const isValidModule = (data: unknown): data is QCMModule | TrueFalseModule | FillBlankModule => {
  return isTrueFalseModule(data) || isFillBlankModule(data) || isQCMModule(data);
};

export class ModuleServiceAdapter implements ModuleServiceContract {
  async getModule(moduleId: string): Promise<QCMModule | TrueFalseModule | FillBlankModule> {
    const response = await axiosInstance.get(`/modules/${moduleId}`);
    const data = response.data;

    if (isValidModule(data)) return data;

    throw new Error('Invalid module type received from API');
  }
}
