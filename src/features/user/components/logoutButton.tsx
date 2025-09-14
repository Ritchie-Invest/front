import { Button } from '~/components/atoms/Button';
import { Center } from '@gluestack-ui/themed';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Screens } from '~/features/navigation/Type/Screens';
import { RootStackParamList } from '~/navigation/AppNavigator';
import { useAuthStore } from '~/features/auth/store/authStore';
import { useClearCurrentUserInfos } from '../store/UserInfosStore';
import { paddings } from '~/lib/theme/theme';
type LogoutButtonProps = {
  handleLogout?: () => void;
};

export const LogoutButton: React.FC<LogoutButtonProps> = ({ handleLogout }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const clear = useClearCurrentUserInfos();
  const logout = useAuthStore((s) => s.logout);

  const handlePress = () => {
    if (handleLogout) {
      clear();
      logout();
      handleLogout();
      return;
    }

    (navigation as any).navigate(Screens.ONBOARDING);
  };

  return (
    <Center flex={1} padding={paddings.paddingMedium}>
      <Button onPress={handlePress} variant="secondary">
        Déconnexion
      </Button>
    </Center>
  );
};
