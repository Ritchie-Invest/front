import { BadgeConfirmationRequest, BadgeConfirmationResponse } from '../models/BadgeConfirmation';

export interface BadgeConfirmationContract {
  postBadgeConfirmation(request: BadgeConfirmationRequest): Promise<BadgeConfirmationResponse>;
}
