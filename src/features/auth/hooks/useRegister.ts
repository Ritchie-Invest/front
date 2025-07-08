import { useMutation } from '@tanstack/react-query';
import { register } from '../services/authService';

export const useRegister = () => {
  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      return await register(email, password);
    },
  });
};
