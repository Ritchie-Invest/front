import { BadgesContract } from '../contracts/BadgesContract';
import { GetBadgesService } from '../services/GetBadgesService';
import { Badge } from '../models/Badge';
import { validateBadge } from '../validation/BadgeValidation';

export class GetBadgesServiceAdapter implements BadgesContract {
  async getBadges(): Promise<Badge[]> {
    try {
      const data = await GetBadgesService.getBadges();

      let badges: any = data;

      if (badges == null) {
        return [];
      }

      if (
        !Array.isArray(badges) &&
        typeof badges === 'object' &&
        Array.isArray((badges as any).badges)
      ) {
        badges = (badges as any).badges;
      }

      if (!Array.isArray(badges)) {
        return [];
      }

      if (!badges.every(validateBadge)) {
        return [];
      }

      return badges as Badge[];
    } catch (error) {
      console.error('GetBadgesServiceAdapter: Error fetching  badges:', error);

      if (error instanceof Error) {
        if (error.message.includes('Network Error') || error.message.includes('fetch')) {
          throw new Error('Unable to fetch user infos. Please check your internet connection.');
        }

        if (error.message.includes('Invalid') || error.message.includes('validation')) {
          throw error;
        }
      }

      throw new Error('An unexpected error occurred while fetching user infos');
    }
  }
}
