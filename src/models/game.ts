export interface Game {
  id: number;
  title: string;
  type: 'qcm' | 'sentences' | 'match' | 'trueOrFalse' | 'gauge' | 'order';
  rules: {
    shuffle_questions: boolean;
    time_limit_seconds: number;
  };
  questions: Question[];
}

// Pour QCM, Sentences, TrueOrFalse

export interface Answer {
  value: string;
  isValid: boolean;
}

export interface Question {
  question: string;
  options: Answer[];
  feedback: string;
}
