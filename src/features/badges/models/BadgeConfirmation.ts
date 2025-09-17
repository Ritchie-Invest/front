import { BadgeType } from '../types/BadgeType';

export interface BadgeConfirmationRequest {
  type: BadgeType;
}

export interface BadgeConfirmationResponse {
  status: string;
}
