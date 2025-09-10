import React from 'react';
import { Box, VStack } from '@gluestack-ui/themed';
import { useCallback, useState } from 'react';
import { RouteProp, useRoute, useFocusEffect } from '@react-navigation/native';
import { MainStackParamList } from '../../../navigation/AppNavigator';
import { useTransactionStore } from '../store/TransactionStore';
import { ETFDetails } from '~/features/etf/components/ETFDetails';
import { colors, paddings, spacing } from '~/lib/theme/theme';
import { TransactionForm } from '../components/TransactionForm';

type ETFTransactionScreenRouteProp = RouteProp<MainStackParamList, 'ETFTransaction'>;

export const ETFTransactionScreen: React.FC = () => {
  const route = useRoute<ETFTransactionScreenRouteProp>();

  return (
    <Box flex={1} bg={colors.mainBackgroundColor}>
      <VStack space={spacing.spacingMediumFallback} p={paddings.paddingLarge}>
        <ETFDetails />
        <TransactionForm />
      </VStack>
    </Box>
  );
};
