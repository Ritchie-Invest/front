import { Portfolio, PortfolioPosition } from '../models/portfolio';
import { axiosInstance } from '~/lib/api/axios';
import { AxiosError } from 'axios';
import { getUserFromToken } from '~/features/auth/services/authService';
import { useAuthStore } from '~/features/auth/store/authStore';

export const portfolioService = {
  getPortfolio: async (): Promise<Portfolio> => {
    try {
      const accessToken = useAuthStore.getState().accessToken;
      if (!accessToken) {
        throw new Error('Utilisateur non connecté ou accessToken manquant');
      }
      const user = getUserFromToken(accessToken);
      const portfolioId = user?.portfolioId || null;
      if (!portfolioId) {
        throw new Error('Utilisateur non connecté ou portfolioId manquant');
      }

      const response = await axiosInstance.get<Portfolio>('/portfolio');

      return {
        currency: response.data.currency,
        cash: response.data.cash,
        investments: response.data.investments,
        totalValue: response.data.totalValue,
      };
    } catch (error) {
      console.error('Error fetching portfolio:', error);

      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          throw new Error('Requête invalide pour récupérer le portfolio');
        } else if (error.response?.status === 404) {
          throw new Error('Portfolio non trouvé');
        } else if (error.response?.status === 500) {
          throw new Error('Erreur serveur lors de la récupération du portfolio');
        }
      }

      throw new Error('Erreur lors de la récupération du portfolio');
    }
  },

  getPortfolioPositionByETF: async (id: string): Promise<PortfolioPosition | null> => {
    try {
      const accessToken = useAuthStore.getState().accessToken;
      if (!accessToken) {
        throw new Error('Utilisateur non connecté ou accessToken manquant');
      }

      const response = await axiosInstance.get<PortfolioPosition>(`/portfolio/position/${id}`);

      return response.data;
    } catch (error) {
      console.error('Error fetching portfolio position:', error);

      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          throw new Error('Requête invalide pour récupérer la position');
        } else if (error.response?.status === 404) {
          throw new Error('Position non trouvée pour cet ETF');
        } else if (error.response?.status === 500) {
          throw new Error('Erreur serveur lors de la récupération de la position');
        }
      }

      throw new Error('Erreur lors de la récupération de la position');
    }
  },
};
