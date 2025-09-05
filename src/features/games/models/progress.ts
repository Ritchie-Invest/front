export interface CompleteModuleResponse {
  isCorrect: boolean;
  feedback: string;
  nextGameModuleId: string | null;
  currentGameModuleIndex: number;
  totalGameModules: number;
  correctChoiceId: string | null;
}
