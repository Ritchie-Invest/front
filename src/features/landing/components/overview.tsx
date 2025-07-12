import React from 'react';
import { Box, ScrollView } from 'native-base';
import { Hero } from './hero';
import { ChaptersTimeline } from './timeline';
import { useProgress } from '~/features/landing/hooks/useProgress';

interface LessonsOverviewProps {
  showProgress?: boolean;
  autoScroll?: boolean;
}

export const LessonsOverview: React.FC<LessonsOverviewProps> = ({
  showProgress = true,
  autoScroll = true,
}) => {
  const {
    chapters,
    lessons,
    completedLessons,
    totalLessons,
    progressValue,
    scrollViewRef,
    handleChapterLayout,
    handleLessonAction,
  } = useProgress();

  return (
    <Box flex={1} bg="white">
      <ScrollView ref={autoScroll ? scrollViewRef : undefined} px={4} py={4}>
        {showProgress && (
          <Hero
            progressValue={progressValue}
            completedLessons={completedLessons}
            totalLessons={totalLessons}
          />
        )}

        <ChaptersTimeline
          chapters={chapters}
          lessons={lessons}
          onChapterLayout={handleChapterLayout}
          onLessonAction={handleLessonAction}
        />
      </ScrollView>
    </Box>
  );
};
