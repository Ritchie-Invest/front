export interface Choice {
  id: string;
  text: string;
  isCorrect: boolean;
  correctionMessage?: string;
}

export interface QCMDetails {
  question: string;
  choices: Choice[];
}

export interface QCMModule {
  id: string;
  lessonId?: string;
  details: QCMDetails;
  updatedAt?: string;
  createdAt?: string;
}
