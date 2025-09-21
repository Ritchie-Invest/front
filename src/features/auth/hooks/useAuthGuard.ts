import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../store/authStore';
import { Screen } from '../../navigation/Type/Screen';

export const useAuthGuard = () => {
  const navigation = useNavigation();

  const accessToken = useAuthStore((s) => s.accessToken);
  const isLoading = useAuthStore((s) => s.isLoading);

  const authScreens = [Screen.ONBOARDING, Screen.AUTH_LOGIN, Screen.AUTH_REGISTER];

  useEffect(() => {
    if (isLoading) return;

    const getCurrentRouteName = () =>
      (navigation as any).getCurrentRoute?.()?.name as string | undefined;
    const currentScreen = getCurrentRouteName();

    if (!accessToken && currentScreen && !authScreens.includes(currentScreen as any)) {
      setTimeout(() => {
        try {
          const parentNav = (navigation as any).getParent?.();
          if (parentNav && typeof parentNav.navigate === 'function') {
            parentNav.navigate(Screen.ONBOARDING);
          } else if (typeof (navigation as any).navigate === 'function') {
            (navigation as any).navigate(Screen.ONBOARDING);
          }
        } catch (e) {
          console.warn('useAuthGuard: unable to navigate to Onboarding', e);
        }
      }, 0);
    }
  }, [accessToken, isLoading, navigation]);
};

export default useAuthGuard;
