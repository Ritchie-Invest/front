// src/components/atoms/Button.tsx
import { Button as NBButton, IButtonProps } from 'native-base';
import { ReactNode } from 'react';

type Variant = 'primary' | 'outline';

type Props = {
  children: ReactNode;
  onPress: () => void;
  isLoading?: boolean;
  variant?: Variant;
} & Omit<IButtonProps, 'variant'>;

export const Button = ({ children, onPress, isLoading, variant = 'primary', ...rest }: Props) => {
  const colorScheme = 'primary';

  return (
    <NBButton
      onPress={onPress}
      isLoading={isLoading}
      colorScheme={colorScheme}
      variant={variant === 'outline' ? 'outline' : 'solid'}
      rounded="md"
      {...rest}
    >
      {children}
    </NBButton>
  );
};
