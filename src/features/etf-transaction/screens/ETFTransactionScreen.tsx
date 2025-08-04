import React from 'react';
import { Box, Center, Text, VStack } from 'native-base';
import { RouteProp, useRoute } from '@react-navigation/native';
import { MainStackParamList } from '../../../navigation/AppNavigator';
import { ETFTransactionHeader } from '../components/Header';
import { TransactionType } from '../types/TransactionType';

type ETFTransactionScreenRouteProp = RouteProp<MainStackParamList, 'ETFTransaction'>;

export const ETFTransactionScreen: React.FC = () => {
  const route = useRoute<ETFTransactionScreenRouteProp>();
  const { etfID, transactionType } = route.params;

  return (
    <Box flex={1} bg="gray.50">
      <VStack space={4} p={4}>
        <ETFTransactionHeader etfID={etfID} />

        <Center flex={1}>
          <Text fontSize="2xl" fontWeight="bold" color="gray.800">
            {transactionType === TransactionType.Buy ? 'Acheter' : 'Vendre'}
          </Text>
        </Center>
      </VStack>
    </Box>
  );
};
