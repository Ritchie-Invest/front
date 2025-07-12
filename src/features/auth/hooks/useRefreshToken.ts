import { useMutation } from '@tanstack/react-query';
import { refreshToken } from '../services/authService';
import { useAuthStore } from '../store/authStore';

export const useRefreshToken = () => {
  const { setAccessToken, logout } = useAuthStore((s) => ({
    setAccessToken: s.setAccessToken,
    logout: s.logout,
  }));

  return useMutation({
    mutationFn: async () => {
      const response = await refreshToken();
      setAccessToken(response.accessToken);
      return response;
    },
    onError: () => {
      logout();
    },
  });
};
