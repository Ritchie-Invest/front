import React from 'react';
import { Box, VStack } from '@gluestack-ui/themed';
import { useCallback, useState } from 'react';
import { RouteProp, useRoute, useFocusEffect } from '@react-navigation/native';
import { MainStackParamList } from '../../../navigation/AppNavigator';
import { useTransactionHistorytore } from '../store/TransactionStore';
import { ETFDetails } from '~/features/etf/components/ETFDetails';
import { colors, paddings, spacing } from '~/lib/theme/theme';
import { TransactionAndResponse } from '../components/TransactionAndResponse';
import { ScrollView } from 'react-native-gesture-handler';

type ETFTransactionScreenRouteProp = RouteProp<MainStackParamList, 'ETFTransaction'>;

export const ETFTransactionScreen: React.FC = () => {
  const route = useRoute<ETFTransactionScreenRouteProp>();

  return (
    <Box height="100%" flex={1} bg={colors.mainBackgroundColor} p={paddings.paddingLarge}>
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <ETFDetails />
        <TransactionAndResponse />
      </ScrollView>
    </Box>
  );
};
