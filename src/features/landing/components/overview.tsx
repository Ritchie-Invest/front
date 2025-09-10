import React from 'react';
import { Box, ScrollView } from '@gluestack-ui/themed';
import { Hero } from './hero';
import { ChaptersTimeline } from './timeline';
import { useProgress } from '~/features/landing/hooks/useProgress';
import { colors, paddings } from '~/lib/theme/theme';

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
    currentLesson,
    currentChapter,
    scrollViewRef,
    handleChapterLayout,
    handleLessonAction,
  } = useProgress();

  return (
    <Box flex={1} bg={colors.mainBackgroundColor} p={paddings.paddingMedium}>
      <ScrollView ref={autoScroll ? (scrollViewRef as any) : undefined} px={4} py={4}>
        {showProgress && (
          <Hero
            chapterTitle={currentChapter?.title || 'Aucun chapitre disponible'}
            currentLesson={currentLesson}
          />
        )}

        <ChaptersTimeline
          chapters={chapters}
          currentLesson={currentLesson}
          onChapterLayout={handleChapterLayout}
          onLessonAction={handleLessonAction}
        />
      </ScrollView>
    </Box>
  );
};
