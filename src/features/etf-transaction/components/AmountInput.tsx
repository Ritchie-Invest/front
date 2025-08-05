import React from 'react';
import { VStack, HStack, Text, Box } from 'native-base';
import { InputField } from '../../../components/atoms/InputField';
import { useConversion } from '../hooks/useConversion';

export const AmountInput: React.FC = () => {
  const { amount, shares, setAmount, isValidAmount } = useConversion();

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
              fontSize={45}
              textAlign="right"
            />
          </Box>
          <Text fontSize={50} fontWeight="bold" color="black" minW="30px">
            €
          </Text>
        </HStack>
        <HStack alignItems="center" justifyContent="center" space={2}>
          <Text fontSize="md" color="gray.600">
            {shares === 0 ? shares.toFixed(0) : shares.toFixed(6)} parts
          </Text>
        </HStack>
      </VStack>
    </VStack>
  );
};
