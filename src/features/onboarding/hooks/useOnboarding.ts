import { useState } from 'react';
import { OnboardingState } from '../models/onboarding.types';

export const useOnboarding = () => {
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

  return {
    state,
    setSelectedGoal,
    setSelectedLevel,
    nextStep,
    previousStep,
    completeOnboarding,
    getProgress,
  };
};
