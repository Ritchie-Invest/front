import React from 'react';
import { Text } from '@gluestack-ui/themed';
import { Pressable } from 'react-native';
import { spacing } from '~/lib/theme/theme';

type TextLinkProps = {
  onPress: () => void;
  children: React.ReactNode;
};

export const TextLink = ({ onPress, children }: TextLinkProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={{ paddingHorizontal: spacing.spacingSmall, paddingVertical: spacing.spacingSmall }}
    >
      <Text color="$blue500" textDecorationLine="underline" fontSize={14}>
        {children}
      </Text>
    </Pressable>
  );
};
