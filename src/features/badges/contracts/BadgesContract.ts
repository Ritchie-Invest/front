import { Badge } from '../models/Badge';

export interface BadgesContract {
  getBadges(): Promise<Badge[]>;
}
