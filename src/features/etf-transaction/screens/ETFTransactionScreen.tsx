import React from 'react';
import { Box, Center, Text } from 'native-base';
import { RouteProp, useRoute } from '@react-navigation/native';
import { MainStackParamList } from '../../../navigation/AppNavigator';

type ETFTransactionScreenRouteProp = RouteProp<MainStackParamList, 'ETFTransaction'>;

export const ETFTransactionScreen: React.FC = () => {
  const route = useRoute<ETFTransactionScreenRouteProp>();
  const { transactionType } = route.params;

  return (
    <Box flex={1} bg="gray.50">
      <Center flex={1}>
        <Text fontSize="2xl" fontWeight="bold" color="gray.800">
          {transactionType === 'buy' ? 'Acheter' : 'Vendre'}
        </Text>
      </Center>
    </Box>
  );
};
