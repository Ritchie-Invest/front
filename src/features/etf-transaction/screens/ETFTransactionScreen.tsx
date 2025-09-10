import React from 'react';
import { Box, VStack } from 'gluestack-ui/themed';
import { useCallback, useState } from 'react';
import { RouteProp, useRoute, useFocusEffect } from '@react-navigation/native';
import { MainStackParamList } from '../../../navigation/AppNavigator';
import { useTransactionStore } from '../store/TransactionStore';
import { ETFDetails } from '~/features/etf-detail/components/ETFDetails';
import { colors } from '~/lib/theme/theme';

type ETFTransactionScreenRouteProp = RouteProp<MainStackParamList, 'ETFTransaction'>;

export const ETFTransactionScreen: React.FC = () => {
  const route = useRoute<ETFTransactionScreenRouteProp>();
  const { transactionType } = route.params;
  const { clearInputsOnly } = useTransactionStore();
  const [transactionResult, setTransactionResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  useFocusEffect(
    useCallback(() => {
      clearInputsOnly();
      setTransactionResult(null);
    }, [clearInputsOnly]),
  );

  return (
    <Box flex={1} bg={colors.mainBackgroundColor}>
      <VStack space={4} p={4} minHeight="full">
        <ETFDetails />
      </VStack>
    </Box>
  );
};
