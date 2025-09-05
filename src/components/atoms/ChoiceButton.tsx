import React from 'react';
import { Pressable, Box, Text } from 'native-base';

interface ChoiceButtonAtomProps {
  text: string;
  borderColor: string;
  bg: string;
  color: string;
  fontWeight: 'normal' | 'bold';
  onPress: () => void;
  disabled?: boolean;
}

const ChoiceButtonAtom: React.FC<ChoiceButtonAtomProps> = ({
  text,
  borderColor,
  bg,
  color,
  fontWeight,
  onPress,
  disabled,
}) => (
  <Pressable onPress={onPress} isDisabled={disabled}>
    <Box borderWidth={1} borderColor={borderColor} bg={bg} p={4} borderRadius={16} mb={1}>
      <Text fontWeight={fontWeight} color={color} fontSize="lg">
        {text}
      </Text>
    </Box>
  </Pressable>
);

export default ChoiceButtonAtom;
