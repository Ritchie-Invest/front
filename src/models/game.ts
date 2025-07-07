import { GameType } from './status';

export interface Game {
  id: number;
  lessonId: number;
  type: GameType;
  rules: {
    shuffle_questions: boolean;
    time_limit_seconds: number;
  };
  questions: Question[];
}

export interface Answer {
  value: string;
  isValid: boolean;
}

export interface Question {
  question: string;
  options: Answer[];
  feedback: string;
}
