export interface FillBlankChoice {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface FillBlankDetails {
  firstText: string;
  secondText: string;
  blanks: FillBlankChoice[];
}

export interface FillBlankModule {
  id: string;
  lessonId?: string;
  details: FillBlankDetails;
  updatedAt?: string;
  createdAt?: string;
}
