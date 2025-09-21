export interface CompleteModuleResponse {
  feedback: string;
  nextGameModuleId: string | null;
  currentGameModuleIndex: number;
  totalGameModules: number;
  correctChoiceId: string;
}

export interface CompleteLessonResponse {
  completedGameModules: number;
  totalGameModules: number;
  isCompleted: boolean;
  xpWon: number;
}
