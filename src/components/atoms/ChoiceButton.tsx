import React from 'react';
import { Pressable, Box, Text } from '@gluestack-ui/themed';
import { spacing, borderRadius } from '~/lib/theme/theme';

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
  <Pressable onPress={onPress} disabled={disabled}>
    <Box
      borderWidth={1}
      borderColor={borderColor}
      bg={bg}
      p={spacing.spacingMedium}
      borderRadius={borderRadius.borderRadiusMedium}
      mb={spacing.spacingMinimum}
    >
      <Text fontWeight={fontWeight} color={color} fontSize="$lg">
        {text}
      </Text>
    </Box>
  </Pressable>
);

export default ChoiceButtonAtom;
