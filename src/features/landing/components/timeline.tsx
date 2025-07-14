import React from 'react';
import { VStack, View } from 'native-base';
import { ChapterCard } from './chapterCard';
import { LessonCard } from './lessonCard';
import { Chapter } from '../models/responses/chapter';

interface ChaptersTimelineProps {
  chapters: Chapter[];
  onChapterLayout: (chapterId: string, event: any) => void;
  onLessonAction: (lessonId: string, action: 'start' | 'review') => void;
}

export const ChaptersTimeline: React.FC<ChaptersTimelineProps> = ({
  chapters,
  onChapterLayout,
  onLessonAction,
}) => {
  return (
    <VStack space={0}>
      {chapters.map((chapter) => (
        <React.Fragment key={chapter.id}>
          <View onLayout={(event) => onChapterLayout(chapter.id, event)}>
            <ChapterCard chapter={chapter} />
          </View>

          <VStack space={3} mb={6} mx={2}>
            {chapter.lessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} onAction={onLessonAction} />
            ))}
          </VStack>
        </React.Fragment>
      ))}
    </VStack>
  );
};
