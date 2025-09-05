import { useQuery } from '@tanstack/react-query';
import { getCompletionStats } from '../services/completionService';
import { useAuthStore } from '../../auth/store/authStore';

export const useCompletion = (lessonId: string) => {
  const token = useAuthStore((s) => s.accessToken) ?? undefined;
  return useQuery({
    queryKey: ['completionStats', lessonId],
    queryFn: () => getCompletionStats(lessonId, token),
    enabled: !!lessonId,
  });
};
