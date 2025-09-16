import { useState, useEffect } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQueryClient } from '@tanstack/react-query';
import { moduleService } from '../services/moduleService';
import { gameProgressService } from '../services/progressService';
import { CompleteModuleResponse } from '../models/progress';
import { GameModule } from '../models/module';
import { MainStackParamList } from '~/navigation/AppNavigator';
import { Screens } from '~/features/navigation/Type/Screens';

type ModuleScreenRouteProp = RouteProp<MainStackParamList, typeof Screens.MODULE_SCREEN>;

export const useModuleScreen = () => {
  const route = useRoute<ModuleScreenRouteProp>();
  const {
    lessonId,
    moduleId,
    currentGameModuleIndex = 0,
    totalGameModules = 1,
    correctAnswers = 0,
  } = route.params;
  const [module, setModule] = useState<GameModule | null>(null);
  const [error, setError] = useState<any>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState<'none' | 'success' | 'error'>('none');
  const [completionResult, setCompletionResult] = useState<CompleteModuleResponse | null>(null);
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const queryClient = useQueryClient();

  useEffect(() => {
    const loadModule = async () => {
      try {
        const moduleData = await moduleService.getModule(moduleId);
        setModule(moduleData);
      } catch (err) {
        setError(err);
      }
    };
    loadModule();
  }, [moduleId]);

  const handleSelect = async (choiceId: string) => {
    setSelected(choiceId);

    try {
      // Envoi de la réponse et récupération du résultat
      const result = await gameProgressService.completeModule(moduleId, choiceId);
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

    // Navigation vers le module suivant ou vers l'écran de completion
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
      let xpWon = 0;
      let isLessonCompleted = false;

      try {
        const lessonResult = await gameProgressService.completeLesson(lessonId);
        xpWon = lessonResult.xpWon || 0;
        isLessonCompleted = lessonResult.isCompleted || false;
      } catch (error) {
        console.error('Error completing lesson:', error);
      }

      navigation.replace(Screens.COMPLETE_SCREEN, {
        lessonId,
        completedModules: newCorrectAnswers,
        totalModules: completionResult.totalGameModules,
        xpWon,
        isLessonCompleted,
      });
    }
  };

  // Calcul de la progression
  const apiTotalModules = completionResult?.totalGameModules || totalGameModules;
  const apiCurrentIndex = completionResult?.currentGameModuleIndex ?? currentGameModuleIndex;

  const progress = apiTotalModules > 0 ? apiCurrentIndex / apiTotalModules : 0;
  // Ajustement visuel de la barre de progression lors de l'affichage du feedback
  const adjustedProgress = showFeedback !== 'none' ? progress + 1 / apiTotalModules : progress;

  return {
    progress: Math.min(adjustedProgress, 1),
    question: module?.details?.question,
    choices: module?.details?.choices || [],
    selected,
    showFeedback,
    completionResult,
    handleSelect,
    handleContinue,
    error,
    loading: !module && !error,
  };
};
