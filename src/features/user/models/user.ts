export interface User {
  id: number;
  name: string;
  first_name: string;
  email: string;
  password: string;
  role: string;
  created_at: Date;
  updated_at: Date;
  currentChapterId: number;
}
