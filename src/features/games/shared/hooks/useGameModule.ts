import { useState, useEffect } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQueryClient } from '@tanstack/react-query';
import { moduleService } from '../services/moduleService';
import { gameProgressService } from '../services/progressService';
import { CompleteModuleResponse } from '../models/progress';
import { MainStackParamList } from '~/navigation/AppNavigator';
import { isTrueFalseModule } from '../utils/moduleTypeGuards';
import { Screens } from '~/features/navigation/Type/Screens';

type ModuleScreenRouteProp = RouteProp<MainStackParamList, typeof Screens.MODULE_SCREEN>;

// Hook unifié qui détecte le type ET charge les données
export const useGameModule = () => {
  const route = useRoute<ModuleScreenRouteProp>();
  const {
    lessonId,
    moduleId,
    currentGameModuleIndex = 0,
    totalGameModules = 1,
    correctAnswers = 0,
  } = route.params;

  const [module, setModule] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [selected, setSelected] = useState<any>(null);
  const [showFeedback, setShowFeedback] = useState<'none' | 'success' | 'error'>('none');
  const [completionResult, setCompletionResult] = useState<CompleteModuleResponse | null>(null);
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const queryClient = useQueryClient();

  useEffect(() => {
    const loadModuleAndDetectType = async () => {
      try {
        const moduleData = await moduleService.getModule(moduleId);
        setModule(moduleData);
      } catch (err) {
        setError(err);
      }
    };

    loadModuleAndDetectType();
  }, [moduleId]);

  const handleSelect = async (selection: any) => {
    setSelected(selection);

    try {
      let result;

      // Compléter le module avec le bon type
      result = await gameProgressService.completeModule(
        moduleId,
        selection,
        isTrueFalseModule(module) ? 'TRUE_OR_FALSE' : 'MCQ',
      );

      setCompletionResult(result);
      setShowFeedback(result.isCorrect ? 'success' : 'error');

      // Invalidation des caches pour forcer le rafraîchissement des données
      queryClient.invalidateQueries({ queryKey: ['chapters', 'progress'] });
      queryClient.invalidateQueries({ queryKey: ['lesson', lessonId] });
    } catch (error: any) {
      // Gestion du cas où le module est déjà complété (erreur 409)
      if (error?.response?.status === 409) {
        navigation.replace(Screens.COMPLETE_SCREEN, {
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

  const handleContinue = async () => {
    if (!completionResult) return;

    setSelected(null);
    const newCorrectAnswers = correctAnswers + (completionResult.isCorrect ? 1 : 0);

    if (completionResult.nextGameModuleId) {
      // Il y a encore des modules dans cette leçon
      navigation.replace(Screens.MODULE_SCREEN, {
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
        navigation.replace(Screens.COMPLETE_SCREEN, {
          lessonId,
          completedModules: lessonResult.completedGameModules,
          totalModules: lessonResult.totalGameModules,
          xpWon: lessonResult.xpWon || 0,
          isLessonCompleted: lessonResult.isCompleted,
        });
      } catch (error) {
        // En cas d'erreur, afficher tout de même l'écran de completion
        navigation.replace(Screens.COMPLETE_SCREEN, {
          lessonId,
          completedModules: newCorrectAnswers,
          totalModules: completionResult.totalGameModules,
          xpWon: 0,
          isLessonCompleted: false,
        });
      }
    }
  };

  // Calcul de la progression
  const apiTotalModules = completionResult?.totalGameModules || totalGameModules;
  const apiCurrentIndex = completionResult?.currentGameModuleIndex ?? currentGameModuleIndex;

  const progress = apiTotalModules > 0 ? apiCurrentIndex / apiTotalModules : 0;
  // Ajustement visuel de la barre de progression lors de l'affichage du feedback
  const adjustedProgress = showFeedback !== 'none' ? progress + 1 / apiTotalModules : progress;

  // Extraire les données spécifiques selon le type
  const gameData = isTrueFalseModule(module)
    ? {
        question: module?.details?.question,
        correctAnswer: module?.details?.isTrue ?? true,
      }
    : {
        question: module?.details?.question,
        choices: module?.details?.choices || [],
      };

  return {
    progress: Math.min(adjustedProgress, 1),
    selected,
    showFeedback,
    completionResult,
    handleSelect,
    handleContinue,
    error,
    loading: !module && !error,
    module,
    ...gameData,
  };
};
