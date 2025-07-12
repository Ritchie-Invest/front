import { Box } from 'native-base';
import { LoginForm } from '../components/LoginForm';

export const LoginScreen = ({
  onLoginSuccess,
  signupEnabled,
}: {
  onLoginSuccess: () => void;
  signupEnabled?: boolean;
}) => (
  <Box flex={1} justifyContent="center" px={4}>
    <LoginForm onSuccess={onLoginSuccess} signupEnabled={signupEnabled} />
  </Box>
);
