import React, { useState, useEffect } from 'react';
import { VStack, HStack, Text, Box } from 'native-base';
import { Keyboard, Platform } from 'react-native';
import { InputField } from '../../../components/atoms/InputField';
import { useConversion } from '../hooks/useConversion';
import { Button } from '~/components/atoms/Button';

export const AmountInput: React.FC = () => {
  const { amount, shares, setAmount, isValidAmount } = useConversion();
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, []);

  const handleSubmitEditing = () => {
    setTimeout(() => {
      Keyboard.dismiss();
    }, 100);
  };

  const screenHeight = window.innerHeight;

  return (
    <VStack space={4} p={4} justifyContent="center" width="100%" height="400px">
      <VStack space={2}>
        <HStack alignItems="center" justifyContent="center" space={2}>
          <Box>
            <InputField
              placeholder="0"
              value={amount}
              onChange={setAmount}
              type="numeric"
              accessibilityLabel="Montant en euros"
              bg="transparent"
              borderWidth={0}
              fontSize={40}
              textAlign="right"
              returnKeyType="done"
              onSubmitEditing={handleSubmitEditing}
              blurOnSubmit={true}
            />
          </Box>
          <Text fontSize={40} fontWeight="bold" color="black" minW="30px">
            €
          </Text>
        </HStack>
        <HStack alignItems="center" justifyContent="center" space={2}>
          <Text fontSize="md" color="gray.600">
            {shares === 0 ? shares.toFixed(0) : shares.toFixed(6)} parts
          </Text>
        </HStack>

        {/* Bouton de validation pour Android quand le clavier est ouvert */}
        {Platform.OS === 'android' && keyboardVisible && (
          <Button variant="outline" size="sm" onPress={handleSubmitEditing} mt={4}>
            Valider
          </Button>
        )}
      </VStack>
    </VStack>
  );
};
