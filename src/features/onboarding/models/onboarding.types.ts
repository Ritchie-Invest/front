export interface OnboardingGoal {
  id: string;
  title: string;
  description?: string;
}

export interface OnboardingLevel {
  id: string;
  title: string;
  description?: string;
  recommended?: boolean;
}

export interface OnboardingState {
  currentStep: number;
  selectedGoal?: string;
  selectedLevel?: string;
  isCompleted: boolean;
}
