import React from 'react';
import { GluestackUIProvider } from '@gluestack-ui/themed';

interface ProviderProps {
  children: React.ReactNode;
}

export const UIProvider = ({ children }: ProviderProps) => {
  return <GluestackUIProvider>{children}</GluestackUIProvider>;
};
