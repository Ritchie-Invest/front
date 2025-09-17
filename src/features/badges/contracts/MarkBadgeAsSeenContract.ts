import { BadgeConfirmationRequest, BadgeConfirmationResponse } from '../models/BadgeConfirmation';

export interface MarkBadgeAsSeenContract {
  markBadgeAsSeen(request: BadgeConfirmationRequest): Promise<BadgeConfirmationResponse>;
}
