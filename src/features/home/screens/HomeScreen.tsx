import React, { useLayoutEffect } from 'react';
import { Text, Box, Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../../auth/store/authStore';

export const HomeScreen = () => {
  const navigation = useNavigation();
  const logout = useAuthStore((s) => s.logout);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={logout} variant="ghost">
          Déconnexion
        </Button>
      ),
    });
  }, [navigation, logout]);

  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Text>Bienvenue 👋</Text>
    </Box>
  );
};
