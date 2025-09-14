import { BadgeType } from '../types/BadgeType';

export interface UserBadge {
  type: BadgeType;
  name: string;
  description: string;
  icon: string;
  awardedAt: null | Date;
}
