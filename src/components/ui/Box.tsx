import React from 'react';
import { Box as GBox } from '@gluestack-ui/themed';
import { ViewProps } from 'react-native';

interface BoxProps extends ViewProps {
  children?: React.ReactNode;
  bg?: string;
  backgroundColor?: string;
  p?: number;
  px?: number;
  py?: number;
  m?: number;
  mx?: number;
  my?: number;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  flex?: number;
  width?: number | string;
  height?: number | string;
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
}

export const Box: React.FC<BoxProps> = ({
  children,
  bg,
  backgroundColor,
  p,
  px,
  py,
  m,
  mx,
  my,
  borderRadius,
  borderWidth,
  borderColor,
  flex,
  width,
  height,
  justifyContent,
  alignItems,
  ...props
}) => {
  return (
    <GBox
      bg={bg || backgroundColor}
      p={p}
      px={px}
      py={py}
      m={m}
      mx={mx}
      my={my}
      borderRadius={borderRadius}
      borderWidth={borderWidth}
      borderColor={borderColor}
      flex={flex}
      width={width}
      height={height}
      justifyContent={justifyContent}
      alignItems={alignItems}
      {...props}
    >
      {children}
    </GBox>
  );
};
