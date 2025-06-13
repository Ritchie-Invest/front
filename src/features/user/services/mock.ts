import { User } from '~/features/user/models/user';
export const mockUser: User = {
  id: 1,
  name: 'Doe',
  first_name: 'John',
  email: 'john.doe@email.com',
  password: 'hashedpassword',
  role: 'student',
  created_at: new Date(),
  updated_at: new Date(),
  currentChapterId: 2,
};
