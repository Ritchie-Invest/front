import React from 'react';
import { Badge, Text } from 'native-base';

interface StatusBadgeProps {
  status: 'available' | 'completed';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const isCompleted = status === 'completed';

  return (
    <Badge variant="solid" bg={isCompleted ? 'green.500' : 'blue.500'} rounded="md">
      <Text fontSize="xs" color="white">
        {isCompleted ? 'Terminée' : 'Disponible'}
      </Text>
    </Badge>
  );
};
