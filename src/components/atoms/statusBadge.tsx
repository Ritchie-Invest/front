import React from 'react';
import { Badge, Text } from 'native-base';

interface StatusBadgeProps {
  status: 'available' | 'completed' | 'locked';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusProps = () => {
    switch (status) {
      case 'completed':
        return {
          bg: 'green.500',
          text: 'Terminée',
          textColor: 'white',
        };
      case 'available':
        return {
          bg: 'blue.500',
          text: 'Disponible',
          textColor: 'white',
        };
      case 'locked':
        return {
          bg: 'gray.400',
          text: 'Verrouillée',
          textColor: 'white',
        };
      default:
        return {
          bg: 'blue.500',
          text: 'Disponible',
          textColor: 'white',
        };
    }
  };

  const statusProps = getStatusProps();

  return (
    <Badge variant="solid" bg={statusProps.bg} rounded="md">
      <Text fontSize="xs" color={statusProps.textColor}>
        {statusProps.text}
      </Text>
    </Badge>
  );
};
