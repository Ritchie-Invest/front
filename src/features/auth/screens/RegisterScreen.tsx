import { Box } from 'native-base';
import { RegisterForm } from '../components/RegisterForm';

export const RegisterScreen = ({
  onBackToLogin,
  onSuccess,
}: {
  onBackToLogin: () => void;
  onSuccess?: () => void;
}) => (
  <Box flex={1} justifyContent="center" px={4}>
    <RegisterForm onBackToLogin={onBackToLogin} onSuccess={onSuccess} />
  </Box>
);
