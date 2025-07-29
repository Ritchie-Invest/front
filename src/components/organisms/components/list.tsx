import React from 'react';
import { FlatList } from 'react-native';
import { VStack, Text, Box } from 'native-base';
import { ListItem } from '../../molecules/components/ListItem';

interface ListProps<T> {
  data: T[];
  loading?: boolean;
  emptyTitle?: string;
  emptySubtitle?: string;
  title?: string;
  renderLeft: (item: T) => React.ReactNode;
  renderRight: (item: T) => React.ReactNode;
  onItemPress?: (item: T) => void;
  isItemSelected?: (item: T) => boolean;
}

export function List<T>({
  data,
  loading = false,
  emptyTitle = 'Aucun élément disponible',
  emptySubtitle,
  title,
  renderLeft,
  renderRight,
  onItemPress,
  isItemSelected,
}: ListProps<T>) {
  if (loading) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" py={8}>
        <Text fontSize="lg" color="gray.400">
          Chargement...
        </Text>
      </Box>
    );
  }

  if (data.length === 0) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" py={8}>
        <Text fontSize="lg" color="gray.500" textAlign="center">
          {emptyTitle}
        </Text>
        {emptySubtitle && (
          <Text fontSize="sm" color="gray.400" textAlign="center" mt={2}>
            {emptySubtitle}
          </Text>
        )}
      </Box>
    );
  }

  return (
    <VStack space={0} flex={1} p={4}>
      {title && (
        <Text fontSize="xl" fontWeight="bold" color="gray.800" mb={4}>
          {title}
        </Text>
      )}
      <FlatList
        data={data}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => (
          <ListItem
            onPress={() => onItemPress?.(item)}
            isSelected={isItemSelected?.(item)}
            left={renderLeft(item)}
            right={renderRight(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </VStack>
  );
}
