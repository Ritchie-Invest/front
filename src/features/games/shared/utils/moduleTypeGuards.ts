import { QCMModule } from '../../qcm/models/module';
import { TrueFalseModule } from '../../true-false/models/module';

export const isQCMModule = (module: any): module is QCMModule => {
  return module?.details && 'choices' in module.details && Array.isArray(module.details.choices);
};

export const isTrueFalseModule = (module: any): module is TrueFalseModule => {
  return (
    module?.details && 'isTrue' in module.details && typeof module.details.isTrue === 'boolean'
  );
};
