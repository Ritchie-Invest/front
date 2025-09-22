import { QCMModule } from '../models/qcmModule';
import { TrueFalseModule } from '../models/trueFalseModule';
import { FillBlankModule } from '../models/fillBlankModule';
import { MODULE_TYPES, ModuleType } from '../types/moduleTypes';
import { isTrueFalseModule, isFillBlankModule, isQCMModule } from '../validation/moduleValidators';

export type Module = QCMModule | TrueFalseModule | FillBlankModule;

export const getModuleType = (module: Module | null): ModuleType => {
  if (isTrueFalseModule(module)) return MODULE_TYPES.TRUE_OR_FALSE;
  if (isFillBlankModule(module)) return MODULE_TYPES.FILL_IN_THE_BLANK;
  return MODULE_TYPES.MCQ;
};

export const getGameData = (module: Module | null) => {
  if (isTrueFalseModule(module)) {
    return {
      question: module.details.sentence,
    };
  }

  if (isFillBlankModule(module)) {
    return {
      question: `${module.details.firstText} ______ ${module.details.secondText}`,
      blanks: module.details.blanks || [],
    };
  }

  return {
    question: module?.details?.question,
    choices: module?.details?.choices || [],
  };
};

export const getModuleChoices = (module: Module | null, t: (key: string) => string) => {
  if (!module) return [];

  if (isQCMModule(module)) {
    return module.details.choices || [];
  }

  if (isFillBlankModule(module)) {
    return module.details.blanks || [];
  }

  return [
    { id: true, text: t('game.trueOrFalse.true') },
    { id: false, text: t('game.trueOrFalse.false') },
  ];
};

export const getCorrectAnswerText = (
  module: Module | null,
  correctChoiceId?: string,
  wasAnswerCorrect?: boolean,
  t?: (key: string) => string,
): string => {
  if (!module || !correctChoiceId) return '';

  if (wasAnswerCorrect === undefined) return '';

  if (isTrueFalseModule(module)) {
    const correctBooleanValue = (module as TrueFalseModule).details.isTrue;
    const choices = getModuleChoices(module, t || ((key) => key));
    const correctChoice = choices.find((choice) => choice.id === correctBooleanValue);
    return correctChoice?.text || '';
  }

  const choices = getModuleChoices(module, t || ((key) => key));
  const correctChoice = choices.find((choice) => choice.id === correctChoiceId);

  return correctChoice?.text || '';
};

export const getTitleKey = (module: Module | null) => {
  if (!module) return 'game.qcm.moduleSentence';

  if (isTrueFalseModule(module)) return 'game.trueOrFalse.moduleSentence';
  if (isFillBlankModule(module)) return 'game.fillBlank.moduleSentence';
  return 'game.qcm.moduleSentence';
};

export const calculateProgress = (
  completionResult: { totalGameModules?: number; currentGameModuleIndex?: number } | null,
  currentGameModuleIndex: number,
  totalGameModules: number,
  showFeedback: 'none' | 'success' | 'error',
) => {
  const apiTotalModules = completionResult?.totalGameModules || totalGameModules;
  const apiCurrentIndex = completionResult?.currentGameModuleIndex ?? currentGameModuleIndex;

  const baseProgress = apiTotalModules > 0 ? apiCurrentIndex / apiTotalModules : 0;

  const adjustedProgress =
    showFeedback !== 'none' ? baseProgress + 1 / apiTotalModules : baseProgress;

  return Math.min(adjustedProgress, 1);
};
