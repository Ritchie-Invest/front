import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { Text } from '@gluestack-ui/themed';
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
      <View style={styles.centerContainer}>
        <Text fontSize={16} color="$coolGray400">
          Chargement...
        </Text>
      </View>
    );
  }

  if (data.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text fontSize={16} color="$coolGray500">
          {emptyTitle}
        </Text>
        {emptySubtitle && (
          <Text fontSize={14} color="$coolGray400" style={styles.subtitle}>
            {emptySubtitle}
          </Text>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {title && (
        <Text fontSize={20} fontWeight="bold" color="$coolGray800" style={styles.title}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 16,
  },
  subtitle: {
    textAlign: 'center',
    marginTop: 8,
  },
});
