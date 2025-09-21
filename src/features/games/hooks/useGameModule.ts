import { useState, useEffect } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { moduleService } from '../services/moduleService';
import { gameProgressService } from '../services/progressService';
import { CompleteModuleResponse } from '../models/progress';
import { MainStackParamList } from '~/navigation/AppNavigator';
import { getModuleType, getGameData, calculateProgress } from '../utils/moduleTypeGuards';
import { Screen } from '~/features/navigation/Type/Screen';
import { QCMModule } from '../models/qcmModule';
import { TrueFalseModule } from '../models/trueFalseModule';
import { FillBlankModule } from '../models/fillBlankModule';
import { lifeEventService } from '~/features/life/services/lifeEventService';
import { useLifeStore } from '~/features/life/store/lifeStore';

const HTTP_CONFLICT = 409;
const LIFE_CHECK_DELAY = 200;

type ModuleScreenRouteProp = RouteProp<MainStackParamList, typeof Screen.MODULE_SCREEN>;

export const useGameModule = () => {
  const route = useRoute<ModuleScreenRouteProp>();
  const {
    lessonId,
    moduleId,
    currentGameModuleIndex = 0,
    totalGameModules = 1,
    correctAnswers = 0,
  } = route.params;

  const [module, setModule] = useState<QCMModule | TrueFalseModule | FillBlankModule | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [selected, setSelected] = useState<string | boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState<'none' | 'success' | 'error'>('none');
  const [completionResult, setCompletionResult] = useState<CompleteModuleResponse | null>(null);
  const [showNoLivesModal, setShowNoLivesModal] = useState<boolean>(false);
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const queryClient = useQueryClient();

  useEffect(() => {
    const loadModuleAndDetectType = async () => {
      try {
        const moduleData = await moduleService.getModule(moduleId);
        setModule(moduleData);
      } catch (err) {
        setError(err as Error);
      }
    };

    loadModuleAndDetectType();
  }, [moduleId]);

  const handleSelect = (selection: string | boolean) => {
    setSelected(selection);
  };

  const handleConfirm = async () => {
    if (selected === null) return;

    try {
      const result = await gameProgressService.completeModule(
        moduleId,
        selected,
        getModuleType(module),
      );

      setCompletionResult(result);

      if (!result.isCorrect) {
        lifeEventService.notifyLifeChanged();

        setTimeout(() => {
          const currentLifeStatus = useLifeStore.getState().lifeStatus;
          if (currentLifeStatus.livesRemaining <= 0) {
            setShowNoLivesModal(true);
            return;
          }
        }, LIFE_CHECK_DELAY);
      }

      setShowFeedback(result.isCorrect ? 'success' : 'error');

      // Invalidation des caches pour forcer le rafraîchissement des données
      queryClient.invalidateQueries({ queryKey: ['chapters', 'progress'] });
      queryClient.invalidateQueries({ queryKey: ['lesson', lessonId] });
    } catch (error: unknown) {
      // Gestion du cas où le module est déjà complété (erreur 409)
      if ((error as AxiosError)?.response?.status === HTTP_CONFLICT) {
        navigation.replace(Screen.COMPLETE_SCREEN, {
          lessonId,
          completedModules: 0,
          totalModules: totalGameModules,
          xpWon: 0,
          isLessonCompleted: false,
        });
        return;
      }
      setShowFeedback('error');
    }
  };

  const handleCloseNoLivesModal = () => {
    setShowNoLivesModal(false);
  };

  const handleContinue = async () => {
    if (!completionResult) return;

    setSelected(null);
    const newCorrectAnswers = correctAnswers + (completionResult.isCorrect ? 1 : 0);

    if (completionResult.nextGameModuleId) {
      // Il y a encore des modules dans cette leçon
      navigation.replace(Screen.MODULE_SCREEN, {
        lessonId,
        moduleId: completionResult.nextGameModuleId,
        currentGameModuleIndex: completionResult.currentGameModuleIndex + 1,
        totalGameModules: completionResult.totalGameModules,
        correctAnswers: newCorrectAnswers,
      });
    } else {
      // Fin de la leçon
      try {
        const lessonResult = await gameProgressService.completeLesson(lessonId);
        navigation.replace(Screen.COMPLETE_SCREEN, {
          lessonId,
          completedModules: lessonResult.completedGameModules,
          totalModules: lessonResult.totalGameModules,
          xpWon: lessonResult.xpWon || 0,
          isLessonCompleted: lessonResult.isCompleted,
        });
      } catch (error: unknown) {
        // En cas d'erreur, afficher tout de même l'écran de completion
        navigation.replace(Screen.COMPLETE_SCREEN, {
          lessonId,
          completedModules: newCorrectAnswers,
          totalModules: completionResult.totalGameModules,
          xpWon: 0,
          isLessonCompleted: false,
        });
      }
    }
  };

  // Extraire les données spécifiques selon le type
  const gameData = getGameData(module);

  // Calcul de la progression
  const progress = calculateProgress(
    completionResult,
    currentGameModuleIndex,
    totalGameModules,
    showFeedback,
  );

  return {
    progress,
    selected,
    showFeedback,
    completionResult,
    handleSelect,
    handleConfirm,
    handleContinue,
    error,
    loading: !module && !error,
    module,
    showNoLivesModal,
    handleCloseNoLivesModal,
    ...gameData,
  };
};
