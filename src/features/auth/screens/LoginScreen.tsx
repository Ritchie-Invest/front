import { Box } from 'native-base';
import { LoginForm } from '../components/LoginForm';

export const LoginScreen = () => (
  <Box flex={1} justifyContent="center" px={4}>
    <LoginForm />
  </Box>
);
