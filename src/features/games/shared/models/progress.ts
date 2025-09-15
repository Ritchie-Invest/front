export interface CompleteModuleResponse {
  isCorrect: boolean;
  feedback: string;
  nextGameModuleId: string | null;
  currentGameModuleIndex: number;
  totalGameModules: number;
  correctChoiceId: string;
}

export interface CompleteLessonResponse {
  completedGameModules: number;
  totalGameModules: number;
  score: number;
  isCompleted: boolean;
  xpWon?: number;
}
