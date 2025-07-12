import { useMutation } from '@tanstack/react-query';
import { forgotPassword } from '../services/authService';

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      return await forgotPassword(email);
    },
  });
};
