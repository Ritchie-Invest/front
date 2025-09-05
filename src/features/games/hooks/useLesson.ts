import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../../auth/store/authStore';
import { progressService } from '../../../services/progressService';
import { Lesson } from '../../landing/models/responses/lesson';

export const useLesson = (lessonId: string) => {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: ['lesson', lessonId],
    queryFn: async (): Promise<Lesson | null> => {
      const progress = await progressService.getUserProgress();
      const lesson = progress.chapters
        .flatMap((chapter) => chapter.lessons)
        .find((lesson) => lesson.id === lessonId);
      return lesson || null;
    },
    enabled: !!accessToken && !!lessonId,
    staleTime: 5 * 60 * 1000,
  });
};
