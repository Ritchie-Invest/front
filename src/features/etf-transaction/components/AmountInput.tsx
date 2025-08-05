import React from 'react';
import { VStack, HStack, Text, Box } from 'native-base';
import { InputField } from '../../../components/atoms/InputField';
import { useConversion } from '../hooks/useConversion';

export const AmountInput: React.FC = () => {
  const { amount, shares, setAmount, isValidAmount } = useConversion();

  const handleAmountChange = (value: string) => {
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue) && numericValue >= 0) {
      setAmount(numericValue);
    } else if (value === '') {
      setAmount(0);
    }
  };

  return (
    <VStack space={4} p={4}>
      <VStack space={2}>
        <HStack alignItems="center" space={2}>
          <Box flex={1}>
            <InputField
              placeholder="0"
              value={amount === '' ? '' : amount.toString()}
              onChangeText={handleAmountChange}
              type="numeric"
              accessibilityLabel="Montant en euros"
              bg="white"
              borderWidth={1}
            />
          </Box>
          <Text fontSize="lg" fontWeight="bold" color="black" minW="30px">
            €
          </Text>
        </HStack>
        <HStack alignItems="center" space={2}>
          <Box flex={1} justifyContent="center">
            <Text fontSize="md" color="black" fontFamily="mono">
              {shares.toFixed(6)}
            </Text>
          </Box>
          <Text fontSize="sm" color="gray.600" minW="40px">
            parts
          </Text>
        </HStack>
      </VStack>
    </VStack>
  );
};
