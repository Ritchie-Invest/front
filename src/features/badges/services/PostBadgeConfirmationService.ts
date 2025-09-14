import { axiosInstance } from '../../../lib/api/axios';
import { BadgeConfirmationRequest, BadgeConfirmationResponse } from '../models/BadgeConfirmation';
import { BadgeConfirmationContract } from '../contracts/BadgesConfirmationContract';

export const PostBadgeConfirmationService: BadgeConfirmationContract = {
  async postBadgeConfirmation(
    request: BadgeConfirmationRequest,
  ): Promise<BadgeConfirmationResponse> {
    const response = await axiosInstance.post('users/me/badges/seen', request);
    return response.data;
  },
};
