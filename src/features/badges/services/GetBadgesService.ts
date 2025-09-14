import { axiosInstance } from '../../../lib/api/axios';
import { Badge } from '../models/Badge';
import { BadgesContract } from '../contracts/BadgesContract';

export const GetBadgesService: BadgesContract = {
  async getBadges(): Promise<Badge[]> {
    const response = await axiosInstance.get<Badge[]>('/users/me/badges');
    return response.data;
  },
};
