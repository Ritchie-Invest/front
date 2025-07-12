import { useMutation } from '@tanstack/react-query';
import { logout } from '../services/authService';
import { useAuthStore } from '../store/authStore';

export const useLogout = () => {
  const logoutStore = useAuthStore((s) => s.logout);

  return useMutation({
    mutationFn: async () => {
      await logout();
      logoutStore();
    },
    onError: () => {
      logoutStore();
    },
  });
};
