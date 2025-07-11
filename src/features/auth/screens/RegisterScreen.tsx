import { Box } from 'native-base';
import { RegisterForm } from '../components/RegisterForm';

export const RegisterScreen = ({ onBackToLogin }: { onBackToLogin: () => void }) => (
  <Box flex={1} justifyContent="center" px={4}>
    <RegisterForm onBackToLogin={onBackToLogin} />
  </Box>
);
