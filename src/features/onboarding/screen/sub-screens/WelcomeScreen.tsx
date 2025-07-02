import React from 'react';
import { VStack, Text, Spacer } from 'native-base';
import { Button } from '../../../../components/atoms/Button';

interface WelcomeScreenProps {
  onStart: () => void;
  onLogin: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart, onLogin }) => {
  return (
    <VStack flex={1} bg="white" px="4" justifyContent="center">
      <VStack space={6} alignItems="center">
        <Text fontSize="2xl" fontWeight="bold" textAlign="center" color="gray.800">
          L'application qui t'apprends à investir à ton rythme gratuitement
        </Text>

        <Spacer />

        <VStack space={4} width="100%">
          <Button onPress={onStart}>Commencer</Button>

          <Button variant="secondary" onPress={onLogin}>
            J'ai déjà un compte
          </Button>
        </VStack>
      </VStack>
    </VStack>
  );
};
