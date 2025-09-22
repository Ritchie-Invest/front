export interface TrueFalseModule {
  id: string;
  lessonId?: string;
  details: TrueFalseDetails;
  updatedAt?: string;
  createdAt?: string;
}

export interface TrueFalseDetails {
  sentence: string;
  isTrue: boolean;
}
