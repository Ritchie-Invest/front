import React, { useState, useMemo } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { Box, VStack, Spinner, Text, Center } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DateRangeType } from '../types/dateRange';
import { ETFWithPriceHistory } from '../models/ETFPriceHistory';
import { ETFPriceHistoryServiceAdapter } from '~/features/etf-detail/adapters/ETFPriceHistoryServiceAdapter';
import { ETFDetails } from '../components/ETFDetails';
import { TimeRangeSelector } from '../components/TimeRangeSelector';
import { LineChartContainer } from '../components/LineChartContainer';
import { useETFPriceHistory } from '../hooks/useETFPriceHistory';
import { BuyAndSellButtons } from '../components/BuyAndSellButtons';
import { useETFStore } from '~/features/etf/store/ETFStore';

interface ETFDetailScreenProps {
  dataService?: any;
}

export const ETFDetailScreen: React.FC<ETFDetailScreenProps> = ({ dataService }) => {
  const { selectedETF } = useETFStore();

  const memoizedDataService = useMemo(
    () => dataService || new ETFPriceHistoryServiceAdapter(),
    [dataService],
  );

  const [selectedRange, setSelectedRange] = useState<DateRangeType>('1M');
  const { data, loading, error, refetch } = useETFPriceHistory<ETFWithPriceHistory>(
    selectedETF?.id ?? '',
    selectedRange,
    memoizedDataService,
  );

  const handleRangeChange = (range: DateRangeType) => {
    setSelectedRange(range);
  };

  if (!selectedETF) {
    return (
      <Center flex={1} bg="gray.50">
        <Text color="gray.600">Aucun ETF sélectionné</Text>
      </Center>
    );
  }

  if (loading && !data) {
    return (
      <Center flex={1} bg="gray.50">
        <Spinner size="large" color="blue.500" />
        <Text mt={4} color="gray.600">
          Chargement des données...
        </Text>
      </Center>
    );
  }

  if (error) {
    return (
      <Center flex={1} bg="gray.50" px={4}>
        <Text textAlign="center" color="red.500" fontSize="md">
          {error}
        </Text>
        <Text mt={4} color="blue.500" onPress={refetch} textDecorationLine="underline">
          Réessayer
        </Text>
      </Center>
    );
  }

  if (!data) {
    return (
      <Center flex={1} bg="gray.50">
        <Text color="gray.600">Aucune donnée disponible</Text>
      </Center>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }} edges={['bottom']}>
      <VStack flex={1} pt={4}>
        <ScrollView
          style={{ flex: 1 }}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch} />}
        >
          <VStack space={4} p={4}>
            <ETFDetails etf={data} />

            <TimeRangeSelector selectedRange={selectedRange} onRangeChange={handleRangeChange} />

            <LineChartContainer priceHistory={data.priceHistory} />
          </VStack>
        </ScrollView>

        <Box p={4}>
          <BuyAndSellButtons />
        </Box>
      </VStack>
    </SafeAreaView>
  );
};
