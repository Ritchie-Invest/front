import React from 'react';
import { HStack, Text, Icon } from '@gluestack-ui/themed';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, borderRadius, typography, paddings } from '~/lib/theme/theme';

interface StatCardProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  color: string;
  label: string;
  value: string | number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, color, label, value }) => (
  <HStack
    bg={colors.mainBackgroundColor}
    borderRadius={borderRadius.borderRadiusSmall}
    shadowColor={colors.overlayColor}
    shadowOffset={{ width: 0, height: 1 }}
    shadowOpacity={0.1}
    shadowRadius={2}
    elevation={1}
    px={paddings.paddingMedium}
    py={paddings.paddingSmall}
    alignItems="center"
    justifyContent="space-between"
  >
    <HStack alignItems="center" space="sm">
      <Icon as={() => <MaterialIcons name={icon} size={20} color={color} />} />
      <Text color={color} fontWeight={typography.fontWeightBold}>
        {label}
      </Text>
    </HStack>
    <Text fontWeight={typography.fontWeightBold} color={colors.primaryTextColor}>
      {value}
    </Text>
  </HStack>
);

export default StatCard;
