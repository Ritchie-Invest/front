import React from 'react';
import { Text } from '@gluestack-ui/themed';
import { Pressable } from 'react-native';

type TextLinkProps = {
  onPress: () => void;
  children: React.ReactNode;
};

export const TextLink = ({ onPress, children }: TextLinkProps) => {
  return (
    <Pressable onPress={onPress} style={{ paddingHorizontal: 8, paddingVertical: 8 }}>
      <Text color="$blue500" textDecorationLine="underline" fontSize={14}>
        {children}
      </Text>
    </Pressable>
  );
};
