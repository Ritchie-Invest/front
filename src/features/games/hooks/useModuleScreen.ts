import { useState, useEffect } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQueryClient } from '@tanstack/react-query';
import { useModule } from '../hooks/useModule';
import { progressService } from '~/services/progressService';
import { CompleteModuleResponse } from '../models/progress';
import { MainStackParamList } from '~/navigation/AppNavigator';

type ModuleScreenRouteProp = RouteProp<MainStackParamList, 'ModuleScreen'>;

export const useModuleScreen = () => {
  const route = useRoute<ModuleScreenRouteProp>();
  const { lessonId, moduleId, currentGameModuleIndex, totalGameModules, reviewMode } = route.params;
  const { data: module, error } = useModule(lessonId, moduleId);
  const [selected, setSelected] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState<'none' | 'success' | 'error'>('none');
  const [completionResult, setCompletionResult] = useState<CompleteModuleResponse | null>(null);
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const queryClient = useQueryClient();

  const isReviewMode = reviewMode === true;
  const question = module?.details?.question;
  const choices = module?.details?.choices || [];

  useEffect(() => {
    if (isReviewMode && choices.length > 0) {
      const correctChoice = choices.find((choice) => choice.isCorrect);
      if (correctChoice) setSelected(correctChoice.id);
    }
  }, [isReviewMode, choices]);

  const handleSelect = async (id: string) => {
    if (isReviewMode || !module) return;
    setSelected(id);
    try {
      const result = await progressService.completeModule(module.id, id);
      console.log('Résultat de correction:', result);
      setCompletionResult(result);
      if (result.isCorrect) {
        setShowFeedback('success');
        queryClient.invalidateQueries({ queryKey: ['chapters', 'progress'] });
        queryClient.invalidateQueries({ queryKey: ['lesson', lessonId] });
      } else {
        setShowFeedback('error');
      }
    } catch {
      setShowFeedback('error');
    }
  };

  const handleContinue = () => {
    setShowFeedback('none');
    setSelected(null);
    setCompletionResult(null);
    if (completionResult?.nextGameModuleId) {
      navigation.replace('ModuleScreen', {
        lessonId,
        moduleId: completionResult.nextGameModuleId,
        currentGameModuleIndex: completionResult.currentGameModuleIndex + 1,
        totalGameModules: completionResult.totalGameModules,
      });
    } else {
      navigation.replace('CompleteScreen', { lessonId });
    }
  };

  const handleReviewContinue = async () => {
    if (!module) return;
    const correctChoice = choices.find((choice) => choice.isCorrect);
    if (!correctChoice) return navigation.goBack();
    const result = await progressService.completeModule(module.id, correctChoice.id);
    if (result.nextGameModuleId) {
      navigation.replace('ModuleScreen', {
        lessonId,
        moduleId: result.nextGameModuleId,
        currentGameModuleIndex: (currentGameModuleIndex ?? 1) + 1,
        totalGameModules: result.totalGameModules,
        reviewMode: true,
      });
    } else {
      navigation.goBack();
    }
  };

  let progress = 0;
  const totalModules = completionResult?.totalGameModules ?? totalGameModules;
  const currentModuleIndex = currentGameModuleIndex ?? 1;
  if (totalModules) {
    progress = currentModuleIndex / totalModules;
    if (!isReviewMode && showFeedback === 'success') {
      progress += 1 / totalModules;
    }
  }

  return {
    progress,
    question,
    choices,
    selected,
    showFeedback,
    isReviewMode,
    completionResult,
    handleSelect,
    handleContinue,
    handleReviewContinue,
    error,
    loading: !module && !error,
  };
};
