import { useEffect, useRef, useState } from 'react';
import { ScrollView as RNScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../../navigation/AppNavigator';
import { useAuthStore } from '../../auth/store/authStore';
import { landingProgressService } from '../services/progressService';
import { Chapter } from '../models/responses/chapter';
import { ChapterStatus } from '../types/ChapterStatus';

export const useProgress = () => {
  const scrollViewRef = useRef<RNScrollView>(null);
  const [chapterLayouts, setChapterLayouts] = useState<Record<string, number>>({});
  const accessToken = useAuthStore((state) => state.accessToken);
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const {
    data: chaptersData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['chapters', 'progress'],
    queryFn: () => landingProgressService.getUserProgress(),
    enabled: !!accessToken,
    staleTime: 5 * 60 * 1000,
  });

  const chapters: Chapter[] = chaptersData?.chapters || [];
  const lessons = chapters.flatMap((chapter: Chapter) => chapter.lessons);

  const completedLessons = chapters.reduce((sum, chapter) => sum + chapter.completedLessons, 0);
  const totalLessons = chapters.reduce((sum, chapter) => sum + chapter.totalLessons, 0);
  const progressValue = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

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
        .filter(
          (chapter) =>
            chapter.status === ChapterStatus.UNLOCKED ||
            chapter.status === ChapterStatus.IN_PROGRESS,
        )
        .sort((a, b) => b.order - a.order)[0];

      if (currentChapter && scrollViewRef.current) {
        const currentChapterY = chapterLayouts[currentChapter.id];
        if (currentChapterY !== undefined) {
          scrollViewRef.current.scrollTo({
            y: Math.max(0, currentChapterY - 100),
            animated: true,
          });
        }
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [chapterLayouts, chapters]);

  const handleLessonAction = (lessonId: string) => {
    const lesson = lessons.find((l) => l.id === lessonId);
    if (lesson?.gameModuleId) {
      navigation.navigate('ModuleScreen', {
        lessonId,
        moduleId: lesson.gameModuleId,
        currentGameModuleIndex: 0,
        totalGameModules: 1,
        correctAnswers: 0,
      });
    }
  };

  return {
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
