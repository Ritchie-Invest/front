import { useMutation } from '@tanstack/react-query';
import { login, getUserFromToken } from '../services/authService';
import { useAuthStore } from '../store/authStore';

export const useLogin = () => {
  const loginStore = useAuthStore((s) => s.login);

  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const data = await login(email, password);
      const user = getUserFromToken(data.accessToken);

      if (!user) {
        throw new Error('Unable to decode user information from token');
      }

      loginStore(data.accessToken, user);
      return data;
    },
  });
};
