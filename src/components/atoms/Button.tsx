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
    textColor?: string;
    borderColor?: string;
    borderWidth?: number;
    $focus?: { bg?: string; textColor?: string };
    $active?: { bg?: string; textColor?: string };
  } => {
    switch (variant) {
      case 'secondary':
        return {
          variant: 'outline',
          bg: colors.transparent,
          borderWidth: 1.5,
          borderColor: colors.primaryActionColor,
          textColor: colors.primaryActionColor,
          $focus: { bg: colors.primaryActionColor, textColor: colors.secondaryTextColor },
          $active: { bg: colors.primaryActionColor, textColor: colors.secondaryTextColor },
        };
      case 'disabled':
        return {
          variant: 'solid',
          isDisabled: true,
          bg: colors.GreyL15,
          textColor: colors.Grey,
        };
      case 'ghost':
        return {
          variant: 'link',
          bg: colors.transparent,
          textColor: colors.primaryActionColor,
          $focus: { bg: colors.transparent, textColor: colors.infoColor },
          $active: { bg: colors.transparent, textColor: colors.infoColor },
        };
      case 'success':
        return {
          variant: 'solid',
          bg: colors.successColor,
          textColor: colors.secondaryTextColor,
          $focus: { bg: colors.successColor, textColor: colors.secondaryTextColor },
          $active: { bg: colors.successColor, textColor: colors.secondaryTextColor },
        };
      case 'error':
        return {
          variant: 'solid',
          bg: colors.errorColor,
          textColor: colors.secondaryTextColor,
          $focus: { bg: colors.errorColor, textColor: colors.secondaryTextColor },
          $active: { bg: colors.errorColor, textColor: colors.secondaryTextColor },
        };
      case 'info':
        return {
          variant: 'solid',
          bg: colors.infoColor,
          textColor: colors.secondaryTextColor,
          $focus: { bg: colors.primaryActionFocusColor, textColor: colors.secondaryTextColor },
          $active: { bg: colors.primaryActionActiveColor, textColor: colors.secondaryTextColor },
        };
      case 'accent':
        return {
          variant: 'solid',
          bg: colors.primaryActionBackgroundColor,
          textColor: colors.secondaryTextColor,
          $focus: { bg: colors.primaryActionBackgroundColor, textColor: colors.secondaryTextColor },
          $active: {
            bg: colors.primaryActionBackgroundColor,
            textColor: colors.secondaryTextColor,
          },
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
          textColor: colors.secondaryTextColor,
          $focus: { bg: colors.primaryActionFocusColor, textColor: colors.secondaryTextColor },
          $active: { bg: colors.primaryActionActiveColor, textColor: colors.secondaryTextColor },
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
        width="100%"
        textAlign="center"
        fontWeight={typography.fontWeightMedium}
        fontSize={typography.bodyLargeSize}
      >
        {children}
      </ButtonText>
    </GButton>
  );
};
