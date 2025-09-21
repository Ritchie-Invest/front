import { QCMModule } from '../models/qcmModule';
import { TrueFalseModule } from '../models/trueFalseModule';
import { FillBlankModule } from '../models/fillBlankModule';

export const isQCMModule = (module: unknown): module is QCMModule => {
  return (
    module != null &&
    typeof module === 'object' &&
    'details' in module &&
    module.details != null &&
    typeof module.details === 'object' &&
    'question' in module.details
  );
};

export const isTrueFalseModule = (module: unknown): module is TrueFalseModule => {
  return (
    module != null &&
    typeof module === 'object' &&
    'details' in module &&
    module.details != null &&
    typeof module.details === 'object' &&
    'sentence' in module.details
  );
};

export const isFillBlankModule = (module: unknown): module is FillBlankModule => {
  return (
    module != null &&
    typeof module === 'object' &&
    'details' in module &&
    module.details != null &&
    typeof module.details === 'object' &&
    'firstText' in module.details
  );
};
