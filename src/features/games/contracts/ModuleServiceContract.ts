import { QCMModule } from '../models/qcmModule';
import { TrueFalseModule } from '../models/trueFalseModule';
import { FillBlankModule } from '../models/fillBlankModule';

export interface ModuleServiceContract {
  getModule(moduleId: string): Promise<QCMModule | TrueFalseModule | FillBlankModule>;
}
