export interface Choice {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface ModuleDetails {
  question: string;
  choices: Choice[];
}

export interface GameModule {
  id: string;
  details: ModuleDetails;
}
