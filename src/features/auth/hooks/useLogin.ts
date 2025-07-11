import { useMutation } from '@tanstack/react-query';
import { login } from '../services/authService';
import { useAuthStore } from '../store/authStore';

export const useLogin = () => {
  const loginStore = useAuthStore((s) => s.login);

  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const data = await login(email, password);
      loginStore(data.accessToken, data.user);
      return data;
    },
  });
};
