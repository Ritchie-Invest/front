import { Button } from '~/components/atoms/Button';
import { Center } from '@gluestack-ui/themed';

import { paddings } from '~/lib/theme/theme';
import { useLogOutButton } from '../hooks/useLogOutButton';

export type LogoutButtonProps = {
  handleLogout?: () => void;
};

export const LogoutButton: React.FC<LogoutButtonProps> = ({ handleLogout }) => {
  const handlePress = useLogOutButton({ handleLogout });

  return (
    <Center flex={1} padding={paddings.paddingMedium}>
      <Button onPress={handlePress} variant="secondary">
        Déconnexion
      </Button>
    </Center>
  );
};
