import { MarkBadgeAsSeenContract } from '../contracts/MarkBadgeAsSeenContract';
import { MarkBadgeAsSeenService } from '../services/MarkBadgeAsSeenService';
import { validateRequest, validateResponse } from '../validation/MarkBadgeAsSeenValidation';
import { BadgeConfirmationRequest, BadgeConfirmationResponse } from '../models/BadgeConfirmation';

export class MarkBadgeAsSeenServiceAdapter implements MarkBadgeAsSeenContract {
  async markBadgeAsSeen(request: BadgeConfirmationRequest): Promise<BadgeConfirmationResponse> {
    try {
      if (!validateRequest(request)) {
        throw new Error('Invalid request structure');
      }

      const response = await MarkBadgeAsSeenService.markBadgeAsSeen(request);
      if (!validateResponse(response)) {
        throw new Error('Invalid response structure from MarkBadgeAsSeenService');
      }
      return response;
    } catch (error) {
      console.error('MarkBadgeAsSeenServiceAdapter: Error posting badge confirmation:', error);

      if (error instanceof Error) {
        if (error.message.includes('Network Error') || error.message.includes('fetch')) {
          throw new Error(
            'Unable to post badge confirmation. Please check your internet connection.',
          );
        }

        if (error.message.includes('Invalid') || error.message.includes('validation')) {
          throw error;
        }
      }

      throw new Error('An unexpected error occurred while fetching user infos');
    }
  }
}
