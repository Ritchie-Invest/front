import React, { useEffect } from 'react';
import { useOnboarding } from '../hooks/useOnboarding';
import { WelcomeScreen } from './sub-screens/WelcomeScreen';
import { GoalSelectionScreen } from './sub-screens/GoalSelectionScreen';
import { LevelSelectionScreen } from './sub-screens/LevelSelectionScreen';
import { CompletionScreen } from './sub-screens/CompletionScreen';
import { LearningGoalsScreen } from './sub-screens/LearningGoalsScreen';
import { WelcomeQuestionsScreen } from './sub-screens/WelcomeQuestionsScreen';
import { ONBOARDING_GOALS } from '../data/onboardingGoals.data';
import { ONBOARDING_LEVELS } from '../data/onboardingLevels.data';
import { LEARNING_GOALS } from '../data/onboardingLearningGoals.data';

interface OnboardingFlowProps {
  onComplete: () => void;
  onLogin: () => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete, onLogin }) => {
  const {
    state,
    setSelectedGoal,
    setSelectedLevel,
    nextStep,
    previousStep,
    completeOnboarding,
    getProgress,
  } = useOnboarding();

  useEffect(() => {
    if (state.currentStep === 6 && state.selectedLevel && state.selectedLevel !== 'beginner') {
      completeOnboarding();
      onComplete();
    }
  }, [state.currentStep, state.selectedLevel, completeOnboarding, onComplete]);

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
    onComplete();
  };

  const renderCurrentScreen = () => {
    switch (state.currentStep) {
      case 0:
        return <WelcomeScreen onStart={handleStart} onLogin={onLogin} />;

      case 1:
        return (
          <WelcomeQuestionsScreen
            onContinue={nextStep}
            onBack={previousStep}
            progress={getProgress()}
          />
        );

      case 2:
        return (
          <GoalSelectionScreen
            goals={ONBOARDING_GOALS}
            selectedGoal={state.selectedGoal}
            onSelectGoal={handleGoalSelect}
            onContinue={nextStep}
            onBack={previousStep}
            progress={getProgress()}
          />
        );

      case 3:
        return (
          <CompletionScreen
            title="Compris"
            description="En apprenant sur Ritchie, voici ce que tu peux atteindre en 2 mois"
            onContinue={nextStep}
            onBack={previousStep}
            progress={getProgress()}
          />
        );

      case 4:
        return (
          <LearningGoalsScreen
            goals={LEARNING_GOALS}
            onContinue={nextStep}
            onBack={previousStep}
            progress={getProgress()}
          />
        );

      case 5:
        return (
          <LevelSelectionScreen
            levels={ONBOARDING_LEVELS}
            selectedLevel={state.selectedLevel}
            onSelectLevel={handleLevelSelect}
            onContinue={nextStep}
            onBack={previousStep}
            progress={getProgress()}
          />
        );

      case 6:
        if (state.selectedLevel === 'beginner') {
          return (
            <CompletionScreen
              title="Parfait"
              description="On part de zéro alors. Prêt pour ta première leçon ?"
              onContinue={handleComplete}
              onBack={previousStep}
              progress={getProgress()}
            />
          );
        }
        return null;

      default:
        return <WelcomeScreen onStart={handleStart} onLogin={onLogin} />;
    }
  };

  return renderCurrentScreen();
};
