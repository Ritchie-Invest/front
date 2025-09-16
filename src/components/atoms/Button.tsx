import React, { ReactNode } from 'react';
import { Button as GButton, ButtonText, ButtonSpinner } from '@gluestack-ui/themed';
import { borderRadius, colors, typography } from '../../lib/theme/theme';

type Variant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'disabled'
  | 'success'
  | 'error'
  | 'info'
  | 'accent'
  | 'ghost';

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
          bg: colors.transparent,
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
      case 'success':
        return {
          variant: 'solid',
          bg: colors.successColor,
          $focus: { bg: colors.successColor },
          $active: { bg: colors.successColor },
        };
      case 'error':
        return {
          variant: 'solid',
          bg: colors.errorColor,
          $focus: { bg: colors.errorColor },
          $active: { bg: colors.errorColor },
        };
      case 'info':
        return {
          variant: 'solid',
          bg: colors.primaryActionColor,
          $focus: { bg: colors.primaryActionFocusColor },
          $active: { bg: colors.primaryActionActiveColor },
        };
      case 'accent':
        return {
          variant: 'solid',
          bg: colors.accentTextColor,
          $focus: { bg: colors.accentTextColor },
          $active: { bg: colors.accentTextColor },
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
      borderWidth={variant === 'secondary' ? 1.5 : 0}
      borderColor={colors.primaryActionColor}
      borderRadius={borderRadius.borderRadiusExtraLarge}
      {...getVariantProps()}
      {...rest}
    >
      {isLoading && <ButtonSpinner mr="$1" />}
      <ButtonText
        width="100%"
        textAlign="center"
        fontWeight={typography.fontWeightMedium}
        fontSize={typography.bodyLargeSize}
        color={variant === 'primary' ? colors.mainBackgroundColor : colors.primaryActionColor}
      >
        {children}
      </ButtonText>
    </GButton>
  );
};
