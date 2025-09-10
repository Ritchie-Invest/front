import React, { ReactNode } from 'react';
import { Button as GButton, ButtonText, ButtonSpinner } from '@gluestack-ui/themed';
import { borderRadius, colors } from '../../lib/theme/theme';

type Variant = 'primary' | 'secondary' | 'outline' | 'disabled' | 'accent' | 'ghost';

type Props = {
  children: ReactNode;
  onPress: () => void;
  isLoading?: boolean;
  variant?: Variant;
};

export const Button = ({ children, onPress, isLoading, variant = 'primary', ...rest }: Props) => {
  const getVariantProps = (): {
    variant: 'solid' | 'outline' | 'link';
    isDisabled?: boolean;
    bg?: string;
    borderColor?: string;
    $focus?: { bg?: string };
    $active?: { bg?: string };
  } => {
    switch (variant) {
      case 'secondary':
        return {
          variant: 'solid',
          bg: colors.secondaryActionColor,
          $focus: { bg: colors.secondaryActionFocusColor },
          $active: { bg: colors.secondaryActionActiveColor },
        };
      case 'disabled':
        return {
          variant: 'solid',
          isDisabled: true,
        };
      case 'ghost':
        return {
          variant: 'link',
          bg: colors.transparent,
          $focus: { bg: colors.GreyL30 },
          $active: { bg: colors.GreyL30 },
        };

      case 'primary':
      default:
        return {
          variant: 'solid',
          bg: colors.primaryActionColor,
          $focus: { bg: colors.primaryActionFocusColor },
          $active: { bg: colors.primaryActionActiveColor },
        };
    }
  };

  return (
    <GButton
      onPress={onPress}
      isDisabled={isLoading || variant === 'disabled'}
      height="$12"
      width="100%"
      borderRadius={borderRadius.borderRadiusExtraLarge}
      {...getVariantProps()}
      {...rest}
    >
      {isLoading && <ButtonSpinner mr="$1" />}
      <ButtonText
        color={variant === 'outline' ? colors.primaryTextColor : colors.mainBackgroundColor}
      >
        {children}
      </ButtonText>
    </GButton>
  );
};
