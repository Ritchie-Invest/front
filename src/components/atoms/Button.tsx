import React, { ReactNode } from 'react';
import { Button as GButton, ButtonText, ButtonSpinner } from '@gluestack-ui/themed';

type Variant = 'primary' | 'secondary' | 'outline' | 'disabled';

type Props = {
  children: ReactNode;
  onPress: () => void;
  isLoading?: boolean;
  variant?: Variant;
};

export const Button = ({ children, onPress, isLoading, variant = 'primary', ...rest }: Props) => {
  const getVariantProps = (): { variant: 'solid' | 'outline' | 'link'; isDisabled?: boolean } => {
    switch (variant) {
      case 'secondary':
        return {
          variant: 'outline',
        };
      case 'disabled':
        return {
          variant: 'solid',
          isDisabled: true,
        };
      case 'outline':
        return {
          variant: 'outline',
        };
      case 'primary':
      default:
        return {
          variant: 'solid',
        };
    }
  };

  return (
    <GButton
      onPress={onPress}
      isDisabled={isLoading || variant === 'disabled'}
      height="$12"
      {...getVariantProps()}
      {...rest}
    >
      {isLoading && <ButtonSpinner mr="$1" />}
      <ButtonText>{children}</ButtonText>
    </GButton>
  );
};
