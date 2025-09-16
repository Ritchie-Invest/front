import { UserBadgesContract } from '../contracts/UserBadgesContract';
import { userBadgesService } from '../services/UserBadgesService';
import { UserBadge } from '../models/userBadge';
import { validateUserBadge } from '../validation/BadgeValidation';

export class UserBadgesServiceAdapter implements UserBadgesContract {
  async getUserBadges(): Promise<UserBadge[]> {
    try {
      const data = await userBadgesService.getUserBadges();

      if (!Array.isArray(data) || !data.every(validateUserBadge)) {
        throw new Error('Invalid user badges structure received from service');
      }

      return data;
    } catch (error) {
      console.error('UserBadgesServiceAdapter: Error fetching user badges:', error);

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
