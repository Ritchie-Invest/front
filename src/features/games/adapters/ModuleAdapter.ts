import { moduleService } from '../services/moduleService';
import { QCMModule } from '../models/qcmModule';
import { TrueFalseModule } from '../models/trueFalseModule';
import { FillBlankModule } from '../models/fillBlankModule';
import { ModuleContract } from '../contracts/ModuleContract';
import { isTrueFalseModule, isFillBlankModule, isQCMModule } from '../validation/moduleValidators';

const isValidModule = (data: unknown): data is QCMModule | TrueFalseModule | FillBlankModule => {
  return isTrueFalseModule(data) || isFillBlankModule(data) || isQCMModule(data);
};

export class ModuleAdapter implements ModuleContract {
  async getModule(moduleId: string): Promise<QCMModule | TrueFalseModule | FillBlankModule> {
    const response = await moduleService.getModule(moduleId);

    if (isValidModule(response)) {
      const validatedModule: QCMModule | TrueFalseModule | FillBlankModule = response;
      return validatedModule;
    }

    throw new Error('Invalid module type received from API');
  }
}
