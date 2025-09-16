import { axiosInstance } from '../../../lib/api/axios';
import { UserBadge } from '../models/userBadge';
import { UserBadgesContract } from '../contracts/UserBadgesContract';

export const userBadgesService: UserBadgesContract = {
  async getUserBadges(): Promise<UserBadge[]> {
    const response = await axiosInstance.get<UserBadge[]>('/users/me/badges');
    return response.data;
  },
};
