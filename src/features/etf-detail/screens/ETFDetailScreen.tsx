import React, { useState } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { Box, VStack, Spinner, Text, Center } from 'native-base';
import { RouteProp, useRoute } from '@react-navigation/native';
import { MainStackParamList } from '../../../navigation/AppNavigator';
import { DateRangeType } from '~/components/molecules/types/dateRange';
import { ETFWithPriceHistory, useETFDetail, ETFDetails, ETFDetailServiceAdapter } from '../index';
import { ETFChart } from '../components/ETFChart';

type ETFDetailScreenRouteProp = RouteProp<MainStackParamList, 'ETFDetails'>;

interface ETFDetailScreenProps {
  dataService?: any;
}

export const ETFDetailScreen: React.FC<ETFDetailScreenProps> = ({
  dataService = new ETFDetailServiceAdapter(),
}) => {
  const route = useRoute<ETFDetailScreenRouteProp>();
  const { etfID } = route.params;

  const [selectedRange, setSelectedRange] = useState<DateRangeType>('1M');
  const { data, loading, error, refetch } = useETFDetail<ETFWithPriceHistory>(
    etfID,
    selectedRange,
    dataService,
  );

  const handleRangeChange = (range: DateRangeType) => {
    setSelectedRange(range);
  };

  if (loading && !data) {
    return (
      <Center flex={1}>
        <Spinner size="large" color="blue.500" />
        <Text mt={4} color="gray.600">
          Chargement des données...
        </Text>
      </Center>
    );
  }

  if (error) {
    return (
      <Center flex={1} px={4}>
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
      <Center flex={1}>
        <Text color="gray.600">Aucune donnée disponible</Text>
      </Center>
    );
  }

  return (
    <Box flex={1} bg="white">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch} />}
      >
        <VStack space={4} p={4} pb={8}>
          <ETFDetails etf={data} />

          <ETFChart
            priceHistory={data.priceHistory}
            selectedRange={selectedRange}
            onRangeChange={handleRangeChange}
          />
        </VStack>
      </ScrollView>
    </Box>
  );
};
