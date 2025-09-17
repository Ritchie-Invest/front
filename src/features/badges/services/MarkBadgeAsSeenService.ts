import { axiosInstance } from '../../../lib/api/axios';
import { BadgeConfirmationRequest, BadgeConfirmationResponse } from '../models/BadgeConfirmation';
import { MarkBadgeAsSeenContract } from '../contracts/MarkBadgeAsSeenContract';

export const MarkBadgeAsSeenService: MarkBadgeAsSeenContract = {
  async markBadgeAsSeen(request: BadgeConfirmationRequest): Promise<BadgeConfirmationResponse> {
    console.log('Sending badge seen request:', request);
    const response = await axiosInstance.patch('users/me/badges/seen', request);
    console.log('Received response:', response.data);
    return response.data;
  },
};
