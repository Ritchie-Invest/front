import { Box } from '@gluestack-ui/themed';
import { RegisterForm } from '../components/RegisterForm';
import { spacing } from '~/lib/theme/theme';

export const RegisterScreen = ({
  onBackToLogin,
  onSuccess,
}: {
  onBackToLogin: () => void;
  onSuccess?: () => void;
}) => (
  <Box flex={1} justifyContent="center" px={spacing.spacingVerySmall}>
    <RegisterForm onBackToLogin={onBackToLogin} onSuccess={onSuccess} />
  </Box>
);
