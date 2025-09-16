import { useEffect, useRef, useState } from 'react';
import { ScrollView as RNScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../../navigation/AppNavigator';
import { Screens } from '../../navigation/Type/Screens';
import { useAuthStore } from '../../auth/store/authStore';
import { ProgressServiceAdapter } from '../adapters/ProgressServiceAdapter';
import { Chapter } from '../models/responses/chapter';
import { Lesson } from '../models/responses/lesson';

const progressAdapter = new ProgressServiceAdapter();

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
    queryFn: () => progressAdapter.getUserProgress(),
    enabled: !!accessToken,
    staleTime: 5 * 60 * 1000,
  });

  const chapters: Chapter[] = chaptersData?.chapters || [];
  const lessons = chapters.flatMap((chapter: Chapter) => chapter.lessons);

  const completedLessons = chapters.reduce((sum, chapter) => sum + chapter.completedLessons, 0);
  const totalLessons = chapters.reduce((sum, chapter) => sum + chapter.totalLessons, 0);
  const progressValue = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const getCurrentLesson = (): Lesson | null => {
    for (const chapter of chapters) {
      if (chapter.status === 'LOCKED') continue;

      for (const lesson of chapter.lessons) {
        if (lesson.status === 'LOCKED') continue;

        if (lesson.status !== 'COMPLETED') {
          return lesson;
        }
      }
    }
    return null;
  };

  const getCurrentChapter = (): Chapter | null => {
    const currentLesson = getCurrentLesson();
    if (!currentLesson) return null;

    return (
      chapters.find((chapter) =>
        chapter.lessons.some((lesson) => lesson.id === currentLesson.id),
      ) || null
    );
  };

  const currentLesson = getCurrentLesson();
  const currentChapter = getCurrentChapter();

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
      const availableChapters = chapters.filter((chapter: Chapter) => chapter.status !== 'LOCKED');
      const targetChapter =
        currentChapter || availableChapters.sort((a: Chapter, b: Chapter) => b.order - a.order)[0];

      if (targetChapter) {
        const targetChapterY = chapterLayouts[targetChapter.id];
        if (targetChapterY !== undefined && scrollViewRef.current) {
          scrollViewRef.current.scrollTo({
            y: Math.max(0, targetChapterY - 100),
            animated: true,
          });
        }
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [chapterLayouts, chapters, currentChapter]);

  const handleLessonAction = (lessonId: string) => {
    const lesson = lessons.find((l) => l.id === lessonId);
    if (lesson?.gameModuleId) {
      navigation.navigate(Screens.MODULE_SCREEN, {
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
    currentLesson,
    currentChapter,
    scrollViewRef,
    handleChapterLayout,
    handleLessonAction,
    isLoading,
    error,
    refetch,
  };
};
