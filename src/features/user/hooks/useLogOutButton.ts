import { useNavigation } from '@react-navigation/native';
import { useClearCurrentUserInfos } from '../store/UserInfosStore';
import { useAuthStore } from '~/features/auth/store/authStore';
import { useLogout } from '~/features/auth/hooks/useLogout';
import { Screens } from '~/features/navigation/Type/Screens';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '~/navigation/AppNavigator';
import type { LogoutButtonProps } from '../components/logoutButton';
import { ClearBadgeStore } from '~/features/badges/store/BadgeStore';
import { useQueryClient } from '@tanstack/react-query';

export const useLogOutButton = ({ handleLogout }: LogoutButtonProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const clear = useClearCurrentUserInfos();
  const clearBadges = ClearBadgeStore();
  const queryClient = useQueryClient();
  const logout = useAuthStore((s) => s.logout);
  const logoutMutation = useLogout();

  const handlePress = () => {
    if (handleLogout) {
      logoutMutation.mutate(undefined, {
        onSettled: () => {
          try {
            clearBadges();
          } catch (e) {}
          try {
            queryClient.removeQueries({ queryKey: ['chapters', 'progress'] });
          } catch (e) {}

          clear();
          logout();
          try {
            handleLogout();
          } catch (e) {}
        },
      });

      return;
    }

    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        try {
          clearBadges();
        } catch (e) {}
        try {
          queryClient.removeQueries({ queryKey: ['chapters', 'progress'] });
        } catch (e) {}

        clear();
        logout();
        (navigation as any).navigate(Screens.ONBOARDING);
      },
      onError: () => {
        try {
          clearBadges();
        } catch (e) {}
        try {
          queryClient.removeQueries({ queryKey: ['chapters', 'progress'] });
        } catch (e) {}

        clear();
        logout();
        (navigation as any).navigate(Screens.ONBOARDING);
      },
    });
  };

  return handlePress;
};
