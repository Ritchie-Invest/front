import { useEffect, useState } from 'react';
import { OnboardingState } from '../models/onboarding.types';

export const useOnboarding = (onComplete?: () => void) => {
  const [state, setState] = useState<OnboardingState>({
    currentStep: 0,
    isCompleted: false,
  });

  const setSelectedGoal = (goalId: string) => {
    setState((prev) => ({ ...prev, selectedGoal: goalId }));
  };

  const setSelectedLevel = (levelId: string) => {
    setState((prev) => ({ ...prev, selectedLevel: levelId }));
  };

  const nextStep = () => {
    setState((prev) => ({ ...prev, currentStep: prev.currentStep + 1 }));
  };

  const previousStep = () => {
    setState((prev) => ({
      ...prev,
      currentStep: Math.max(0, prev.currentStep - 1),
    }));
  };

  const completeOnboarding = () => {
    setState((prev) => ({ ...prev, isCompleted: true }));
  };

  const getProgress = () => {
    const totalSteps = 6;
    return Math.round((state.currentStep / totalSteps) * 100);
  };

  const handleStart = () => {
    nextStep();
  };
  const handleGoalSelect = (goalId: string) => {
    setSelectedGoal(goalId);
  };
  const handleLevelSelect = (levelId: string) => {
    setSelectedLevel(levelId);
  };
  const handleComplete = () => {
    completeOnboarding();
    if (onComplete) onComplete();
  };

  useEffect(() => {
    if (state.currentStep === 6 && state.selectedLevel && state.selectedLevel !== 'beginner') {
      completeOnboarding();
      if (onComplete) onComplete();
    }
  }, [state.currentStep, state.selectedLevel, completeOnboarding, onComplete]);

  return {
    state,
    handleStart,
    handleGoalSelect,
    handleLevelSelect,
    handleComplete,
    nextStep,
    previousStep,
    getProgress,
  };
};
