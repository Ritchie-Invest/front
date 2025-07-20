import React from 'react';
import { FlatList } from 'react-native';
import { VStack, Text, Box } from 'native-base';
import { ETFListItem } from './ETFListItem';
import { ETFWithCurrentPrice } from '../models/etf';

interface ETFListProps {
  positions: ETFWithCurrentPrice[];
  loading?: boolean;
}

export const ETFList: React.FC<ETFListProps> = ({ positions, loading = false }) => {
  if (loading) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" py={8}>
        <Text fontSize="lg" color="gray.400">
          Chargement des ETF...
        </Text>
      </Box>
    );
  }

  if (positions.length === 0) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" py={8}>
        <Text fontSize="lg" color="gray.500" textAlign="center">
          Aucun ETF disponible
        </Text>
        <Text fontSize="sm" color="gray.400" textAlign="center" mt={2}>
          Les ETF seront bientôt disponibles
        </Text>
      </Box>
    );
  }

  return (
    <VStack space={0} flex={1}>
      <Text fontSize="xl" fontWeight="bold" color="gray.800" mb={4}>
        ETF Disponibles
      </Text>
      <FlatList
        data={positions}
        keyExtractor={(item) => item.etfID.toString()}
        renderItem={({ item }) => <ETFListItem etf={item} />}
        showsVerticalScrollIndicator={false}
      />
    </VStack>
  );
};
