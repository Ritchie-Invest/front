import { useMutation } from '@tanstack/react-query';
import * as Linking from 'expo-linking';
import { getSSOUrl } from '../services/authService';
import { SSOProvider } from '../models/sso';

export const useSSOLogin = () => {
  return useMutation({
    mutationFn: async (provider: SSOProvider) => {
      const response = await getSSOUrl(provider);
      await Linking.openURL(response.url);
    },
  });
};
