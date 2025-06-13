import React from 'react';
import { VStack, View } from 'native-base';
import { ChapterCard } from './chapterCard';
import { LessonCard } from './lessonCard';
import { ChapterWithProgress, LessonWithStatus } from '~/features/lessons/services/lessonService';

interface ChaptersTimelineProps {
  chapters: ChapterWithProgress[];
  lessons: LessonWithStatus[];
  onChapterLayout: (chapterId: number, event: any) => void;
  onLessonAction: (lessonId: number, action: 'start' | 'review') => void;
}

export const ChaptersTimeline: React.FC<ChaptersTimelineProps> = ({
  chapters,
  lessons,
  onChapterLayout,
  onLessonAction,
}) => {
  return (
    <VStack space={0}>
      {chapters.map((chapter) => (
        <React.Fragment key={chapter.id}>
          {/* Chapitre avec gestion du layout pour l'auto-scroll */}
          <View onLayout={(event) => onChapterLayout(chapter.id, event)}>
            <ChapterCard
              title={chapter.title}
              description={chapter.description}
              completedLessons={chapter.completedLessons}
              totalLessons={chapter.totalLessons}
              status={chapter.status}
            />
          </View>

          {/* Leçons du chapitre */}
          <VStack space={3} mb={6} mx={2}>
            {lessons
              .filter((lesson) => lesson.chapterId === chapter.id)
              .map((lesson) => (
                <LessonCard
                  key={lesson.id}
                  id={lesson.id}
                  title={lesson.title}
                  description={lesson.description}
                  status={lesson.status}
                  onAction={onLessonAction}
                />
              ))}
          </VStack>
        </React.Fragment>
      ))}
    </VStack>
  );
};
