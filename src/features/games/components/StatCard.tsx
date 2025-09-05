import React from 'react';
import { HStack, Text } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { Icon } from '~/components/atoms/Icon';

interface StatCardProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  color: string;
  label: string;
  value: string | number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, color, label, value }) => (
  <HStack
    bg="white"
    borderRadius={12}
    shadow={1}
    px={4}
    py={3}
    alignItems="center"
    justifyContent="space-between"
  >
    <HStack alignItems="center" space={2}>
      <Icon name={icon} color={color} size="md" />
      <Text color={color} fontWeight="bold">
        {label}
      </Text>
    </HStack>
    <Text fontWeight="bold" color="black">
      {value}
    </Text>
  </HStack>
);

export default StatCard;
