import { Box } from '@gluestack-ui/themed';
import { LoginForm } from '../components/LoginForm';
import { spacing, paddings } from '~/lib/theme/theme';

export const LoginScreen = ({
  onLoginSuccess,
  signupEnabled,
  onShowOnboarding,
}: {
  onLoginSuccess: () => void;
  signupEnabled?: boolean;
  onShowOnboarding?: () => void;
}) => (
  <Box flex={1} justifyContent="center" px={paddings.paddingVerySmall}>
    <LoginForm
      onSuccess={onLoginSuccess}
      signupEnabled={signupEnabled}
      onShowOnboarding={onShowOnboarding}
    />
  </Box>
);
