import { Badge } from '../models/Badge';

export interface GetBadgesContract {
  getBadges(): Promise<Badge[]>;
}
