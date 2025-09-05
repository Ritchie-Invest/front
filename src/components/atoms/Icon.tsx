import React from 'react';
import { Icon as NBIcon, IIconProps } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

type IconProps = IIconProps & {
  name: keyof typeof MaterialIcons.glyphMap;
  color?: string;
  size?: string | number;
};

export const Icon = ({ name, color = 'white', size = 'md', ...rest }: IconProps) => (
  <NBIcon as={MaterialIcons} name={name} color={color} size={size} {...rest} />
);
