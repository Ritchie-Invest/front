import { useMutation } from '@tanstack/react-query';
import { register } from '../services/authService';

export const useRegister = () => {
  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const result = await register(email, password);

      return result;
    },
  });
};
