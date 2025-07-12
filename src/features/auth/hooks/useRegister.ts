import { useMutation } from '@tanstack/react-query';
import { register, getUserFromToken } from '../services/authService';
import { useAuthStore } from '../store/authStore';

export const useRegister = () => {
  const loginStore = useAuthStore((s) => s.login);

  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const result = await register(email, password);
      const user = getUserFromToken(result.accessToken);

      if (!user) {
        throw new Error('Unable to decode user information from token');
      }

      loginStore(result.accessToken, user);
      return result;
    },
  });
};
