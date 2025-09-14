import { BadgeType } from '../types/BadgeType';

export interface Badge {
  type: BadgeType;
  name: string;
  description: string;
  awardedAt: null | Date;
  hasSeen: boolean;
}
