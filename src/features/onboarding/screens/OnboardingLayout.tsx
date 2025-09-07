import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { useOnboarding } from '../hooks/useOnboarding';
import { WelcomeScreen } from './sub-screens/WelcomeScreen';
import { WelcomeQuestionsScreen } from './sub-screens/WelcomeQuestionsScreen';
import { GoalSelectionScreen } from './sub-screens/GoalSelectionScreen';
import { CompletionScreen } from './sub-screens/CompletionScreen';
import { LearningGoalsScreen } from './sub-screens/LearningGoalsScreen';
import { LevelSelectionScreen } from './sub-screens/LevelSelectionScreen';
import { ONBOARDING_GOALS } from '../data/onboardingGoals.data';
import { ONBOARDING_LEVELS } from '../data/onboardingLevels.data';
import { LEARNING_GOALS } from '../data/onboardingLearningGoals.data';
import { colors } from '~/lib/theme/theme';

interface OnboardingLayoutProps {
  onComplete: () => void;
  onLogin: () => void;
}

export const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({ onComplete, onLogin }) => {
  const {
    state,
    handleStart,
    handleGoalSelect,
    handleLevelSelect,
    handleComplete,
    nextStep,
    previousStep,
    getProgress,
  } = useOnboarding(onComplete);

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

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>{renderCurrentScreen()}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.mainBackgroundColor,
  },
  container: {
    flex: 1,
    paddingVertical: 32,
  },
});
