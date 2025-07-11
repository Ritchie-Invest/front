// /src/features/lessons/hooks/useLessonsProgress.ts
import { useEffect, useRef, useState } from 'react';
import { ScrollView as RNScrollView } from 'react-native';
import { lessonsService } from '../services/lessonService';
import { mockUser } from '~/features/user/services/mock';

export const useLessonsProgress = () => {
  const scrollViewRef = useRef<RNScrollView>(null);
  const [chapterLayouts, setChapterLayouts] = useState<Record<number, number>>({});

  const user = mockUser; // À remplacer par useUser() du store global
  const chapters = lessonsService.getChaptersWithProgress();
  const lessons = lessonsService.getAllLessons();

  const completedLessons = chapters.reduce((sum, chapter) => sum + chapter.completedLessons, 0);
  const totalLessons = chapters.reduce((sum, chapter) => sum + chapter.totalLessons, 0);
  const progressValue = Math.round((completedLessons / totalLessons) * 100);

  // Méthode pour enregistrer la position de chaque chapitre
  const handleChapterLayout = (chapterId: number, event: any) => {
    const { y } = event.nativeEvent.layout;
    setChapterLayouts((prev) => ({
      ...prev,
      [chapterId]: y,
    }));
  };

  // Auto-scroll vers le chapitre actuel
  useEffect(() => {
    const timer = setTimeout(() => {
      const currentChapterY = chapterLayouts[user.currentChapterId];
      if (currentChapterY !== undefined && scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          y: Math.max(0, currentChapterY - 100),
          animated: true,
        });
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [chapterLayouts, user.currentChapterId]);

  const handleLessonAction = (lessonId: number, action: 'start' | 'review') => {
    console.log(`Action: ${action} on lesson ${lessonId}`);
  };

  return {
    user,
    chapters,
    lessons,
    completedLessons,
    totalLessons,
    progressValue,
    scrollViewRef,
    handleChapterLayout,
    handleLessonAction,
  };
};
