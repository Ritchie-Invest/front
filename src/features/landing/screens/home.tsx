import React, { useLayoutEffect } from 'react';
import { Box, Button } from 'native-base';
import { LessonsOverview } from '../components/overview';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../../auth/store/authStore';

const HomeScreen = ({ onLogout }: { onLogout: () => void }) => {
  const navigation = useNavigation();
  const logout = useAuthStore((s) => s.logout);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => {
            logout();
            onLogout();
          }}
          variant="ghost"
        >
          Déconnexion
        </Button>
      ),
    });
  }, [navigation, logout, onLogout]);

  return (
    <Box flex={1} safeArea>
      <LessonsOverview />
    </Box>
  );
};

export default HomeScreen;
