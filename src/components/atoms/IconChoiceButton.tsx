import React from 'react';
import { Pressable, Box, Icon } from '@gluestack-ui/themed';
import { MaterialIcons } from '@expo/vector-icons';
import { spacing, borderRadius } from '~/lib/theme/theme';

interface IconChoiceButtonProps {
  iconName: keyof typeof MaterialIcons.glyphMap;
  iconColor: string;
  borderColor: string;
  bg: string;
  onPress: () => void;
  disabled?: boolean;
}

const IconChoiceButton: React.FC<IconChoiceButtonProps> = ({
  iconName,
  iconColor,
  borderColor,
  bg,
  onPress,
  disabled,
}) => (
  <Pressable onPress={onPress} disabled={disabled} flex={1} mx={spacing.spacingMinimum}>
    <Box
      borderWidth={2}
      borderColor={borderColor}
      bg={bg}
      borderRadius={borderRadius.borderRadiusLarge}
      height="$24"
      width="100%"
      justifyContent="center"
      alignItems="center"
    >
      <Icon as={() => <MaterialIcons name={iconName} size={32} color={iconColor} />} />
    </Box>
  </Pressable>
);

export default IconChoiceButton;
