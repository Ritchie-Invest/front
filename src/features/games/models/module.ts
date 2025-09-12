export interface Choice {
  id: string;
  text: string;
  isCorrect: boolean;
  correctionMessage?: string;
}

export interface ModuleDetails {
  question: string;
  choices: Choice[];
}

export interface GameModule {
  id: string;
  lessonId?: string;
  details: ModuleDetails;
  updatedAt?: string;
  createdAt?: string;
}
