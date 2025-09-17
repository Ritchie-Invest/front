import { GetBadgesContract } from '../contracts/GetBadgesContract';
import { GetBadgesService } from '../services/GetBadgesService';
import { Badge } from '../models/Badge';
import { validateBadge } from '../validation/BadgeValidation';

export class GetBadgesServiceAdapter implements GetBadgesContract {
  async getBadges(): Promise<Badge[]> {
    try {
      const data = await GetBadgesService.getBadges();

      let badges: any = data ?? [];

      if (
        !Array.isArray(badges) &&
        typeof badges === 'object' &&
        Array.isArray((badges as any).badges)
      ) {
        badges = (badges as any).badges;
      }

      if (!Array.isArray(badges)) {
        console.warn('GetBadgesServiceAdapter: expected array but got:', badges);
        return [];
      }

      const normalized = badges.map((b: any) => {
        const awardedRaw = b.awardedAt;
        const awardedAt = awardedRaw ? new Date(awardedRaw) : null;
        return {
          ...b,
          awardedAt,
          hasSeen: typeof b.hasSeen === 'boolean' ? b.hasSeen : false,
        } as Badge;
      });

      const valid = normalized.filter((b: any) => {
        const ok = validateBadge(b);
        if (!ok) {
          console.debug('GetBadgesServiceAdapter: badge failed validation and will be skipped:', b);
        }
        return ok;
      });

      console.debug('GetBadgesServiceAdapter: returning valid badges (awarded or not):', valid);
      return valid as Badge[];
    } catch (error) {
      console.error('GetBadgesServiceAdapter: Error fetching  badges:', error);

      if (error instanceof Error) {
        if (error.message.includes('Network Error') || error.message.includes('fetch')) {
          throw new Error('Unable to fetch user infos. Please check your internet connection.');
        }

        if (error.message.includes('Invalid') || error.message.includes('validation')) {
          throw error;
        }
      }

      throw new Error('An unexpected error occurred while fetching user infos');
    }
  }
}
