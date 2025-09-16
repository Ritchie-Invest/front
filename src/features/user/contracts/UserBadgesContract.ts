import { UserBadge } from '../models/userBadge';

export interface UserBadgesContract {
  getUserBadges(): Promise<UserBadge[]>;
}
