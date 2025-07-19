import React from 'react';
import { Box, Text, HStack } from 'native-base';

interface PortfolioBalanceProps {
  balance: number;
  totalValue: number;
  loading?: boolean;
}

export const PortfolioBalance: React.FC<PortfolioBalanceProps> = ({
  balance,
  totalValue,
  loading = false,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  if (loading) {
    return (
      <Box alignItems="center" py={6}>
        <Text fontSize="xl" color="gray.400">
          Chargement...
        </Text>
      </Box>
    );
  }

  return (
    <Box alignItems="center" py={6}>
      <Text fontSize="3xl" fontWeight="bold" color="blue.600" mb={2}>
        {formatCurrency(totalValue)}
      </Text>
      <Text fontSize="lg" color="gray.600">
        Valeur totale du portfolio
      </Text>
      <HStack space={4} mt={4}>
        <Box alignItems="center">
          <Text fontSize="md" color="gray.500">
            Liquidités
          </Text>
          <Text fontSize="lg" fontWeight="semibold" color="green.600">
            {formatCurrency(balance)}
          </Text>
        </Box>
        <Box alignItems="center">
          <Text fontSize="md" color="gray.500">
            Investissements
          </Text>
          <Text fontSize="lg" fontWeight="semibold" color="blue.600">
            {formatCurrency(totalValue - balance)}
          </Text>
        </Box>
      </HStack>
    </Box>
  );
};
