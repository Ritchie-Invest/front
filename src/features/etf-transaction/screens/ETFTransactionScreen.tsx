import React from 'react';
import { Box, Center } from '@gluestack-ui/themed';
import { ETFDetails } from '~/features/etf/components/ETFDetails';
import { colors, paddings } from '~/lib/theme/theme';
import { ScrollView } from 'react-native-gesture-handler';
import { ResponseMessage } from '../components/ResponseMessage';
import { useTransactionStore } from '../store/TransactionStore';
import { TransactionForm } from '../components/TransactionForm';

export const ETFTransactionScreen: React.FC = () => {
  const { error, response } = useTransactionStore();

  if (response || error) {
    return (
      <Center height="100%" flex={1} bg={colors.mainBackgroundColor} p={paddings.paddingLarge}>
        <ResponseMessage response={response} error={error} />
      </Center>
    );
  } else {
    return (
      <Box height="100%" flex={1} bg={colors.mainBackgroundColor} p={paddings.paddingLarge}>
        <ScrollView
          keyboardShouldPersistTaps="always"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <ETFDetails />
          <TransactionForm />
        </ScrollView>
      </Box>
    );
  }
};
