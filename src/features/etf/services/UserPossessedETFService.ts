import { UserPossessedETF } from '../models/UserPossessedETF';
import { axiosInstance } from '~/lib/api/axios';

export const UserPossessedETFService = {
  getUserPossessedETF: async (tickerId: string): Promise<UserPossessedETF> => {
    try {
      const response = await axiosInstance.get<UserPossessedETF>(
        `/tickers/${tickerId}/possessed-value`,
      );

      return response.data;
    } catch (error: any) {
      console.error('Failed to fetch ETFs from API:', error);
      if (error.response) {
        throw new Error(
          `Erreur API (${error.response.status}): ${error.response.data?.message || 'Erreur inconnue'}`,
        );
      } else if (error.request) {
        throw new Error('Erreur de réseau: Impossible de contacter le serveur');
      } else {
        throw new Error(`Erreur: ${error.message || 'Erreur inconnue'}`);
      }
    }
  },
};
