import { QCMModule } from '../models/qcmModule';
import { TrueFalseModule } from '../models/trueFalseModule';

export const isQCMModule = (module: any): module is QCMModule => {
  return module?.details && 'choices' in module.details && Array.isArray(module.details.choices);
};

export const isTrueFalseModule = (module: any): module is TrueFalseModule => {
  return (
    module?.details && 'isTrue' in module.details && typeof module.details.isTrue === 'boolean'
  );
};
