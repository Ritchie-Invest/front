import { QCMModule } from '../models/qcmModule';
import { TrueFalseModule } from '../models/trueFalseModule';

export interface ModuleServiceContract {
  getModule(moduleId: string): Promise<QCMModule | TrueFalseModule>;
}
