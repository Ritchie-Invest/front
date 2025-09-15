import React from 'react';
import { Pressable, Box } from 'native-base';
import { Icon } from './Icon';
import { MaterialIcons } from '@expo/vector-icons';

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
  <Pressable onPress={onPress} isDisabled={disabled} flex={1} mx={2}>
    <Box
      borderWidth={2}
      borderColor={borderColor}
      bg={bg}
      borderRadius="lg"
      height={100}
      width="100%"
      justifyContent="center"
      alignItems="center"
    >
      <Icon name={iconName} size="2xl" color={iconColor} />
    </Box>
  </Pressable>
);

export default IconChoiceButton;
