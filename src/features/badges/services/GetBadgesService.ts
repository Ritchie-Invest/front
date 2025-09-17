import { axiosInstance } from '../../../lib/api/axios';
import { Badge } from '../models/Badge';
import { GetBadgesContract } from '../contracts/GetBadgesContract';

export const GetBadgesService: GetBadgesContract = {
  async getBadges(): Promise<Badge[]> {
    const response = await axiosInstance.get<Badge[]>('/users/me/badges');
    return response.data;
  },
};
