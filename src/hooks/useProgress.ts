import { useEffect, useRef, useState } from 'react';
import { ScrollView as RNScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../navigation/AppNavigator';
import { useAuthStore } from '../features/auth/store/authStore';
import { progressService } from '../services/progressService';
import { Chapter } from '../features/landing/models/responses/chapter';

export const useProgress = () => {
  const scrollViewRef = useRef<RNScrollView>(null);
  const [chapterLayouts, setChapterLayouts] = useState<Record<string, number>>({});

  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);

  const {
    data: chaptersData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['chapters', 'progress'],
    queryFn: () => progressService.getUserProgress(),
    enabled: !!accessToken,
    staleTime: 5 * 60 * 1000,
  });

  const chapters: Chapter[] = chaptersData?.chapters || [];
  const lessons = chapters.flatMap((chapter: Chapter) => chapter.lessons);

  const completedLessons = chapters.reduce(
    (sum: number, chapter: Chapter) => sum + chapter.completedLessons,
    0,
  );
  const totalLessons = chapters.reduce(
    (sum: number, chapter: Chapter) => sum + chapter.totalLessons,
    0,
  );
  const progressValue = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const handleChapterLayout = (chapterId: string, event: any) => {
    const { y } = event.nativeEvent.layout;
    setChapterLayouts((prev) => ({
      ...prev,
      [chapterId]: y,
    }));
  };

  useEffect(() => {
    if (!chapters.length) return;

    const timer = setTimeout(() => {
      const currentChapter = chapters
        .filter((chapter: Chapter) => chapter.isUnlocked)
        .sort((a: Chapter, b: Chapter) => b.order - a.order)[0];

      if (currentChapter) {
        const currentChapterY = chapterLayouts[currentChapter.id];
        if (currentChapterY !== undefined && scrollViewRef.current) {
          scrollViewRef.current.scrollTo({
            y: Math.max(0, currentChapterY - 100),
            animated: true,
          });
        }
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [chapterLayouts, chapters]);

  const handleLessonAction = (lessonId: string, action: 'start' | 'review') => {
    const lesson = lessons.find((l) => l.id === lessonId);
    const moduleId = lesson?.gameModuleId;
    if (moduleId && lesson) {
      navigation.navigate('ModuleScreen', {
        lessonId,
        moduleId,
        currentGameModuleIndex: action === 'review' ? 1 : lesson.completedModules,
        totalGameModules: lesson.totalModules,
        reviewMode: action === 'review',
      });
    }
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
    isLoading,
    error,
    refetch,
  };
};
