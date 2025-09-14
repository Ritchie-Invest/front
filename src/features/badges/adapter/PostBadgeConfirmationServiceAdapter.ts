import { BadgeConfirmationContract } from '../contracts/BadgesConfirmationContract';
import { PostBadgeConfirmationService } from '../services/PostBadgeConfirmationService';
import { validateRequest, validateResponse } from '../validation/BadgeConfirmationValidation';
import { BadgeConfirmationRequest, BadgeConfirmationResponse } from '../models/BadgeConfirmation';

export class PostBadgeConfirmationServiceAdapter implements BadgeConfirmationContract {
  async postBadgeConfirmation(
    request: BadgeConfirmationRequest,
  ): Promise<BadgeConfirmationResponse> {
    try {
      if (!validateRequest(request)) {
        throw new Error('Invalid request structure');
      }

      const response = await PostBadgeConfirmationService.postBadgeConfirmation(request);
      if (!validateResponse(response)) {
        throw new Error('Invalid response structure from PostBadgeConfirmationService');
      }
      return response;
    } catch (error) {
      console.error(
        'PostBadgeConfirmationServiceAdapter: Error posting badge confirmation:',
        error,
      );

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
