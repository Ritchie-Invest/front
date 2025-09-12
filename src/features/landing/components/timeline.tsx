import React, { useEffect, useState } from 'react';
import { Box, VStack, View, Text } from '@gluestack-ui/themed';
import { LessonCircle } from './lessonCircle';
import { Chapter } from '../models/responses/chapter';
import { Lesson } from '../models/responses/lesson';
import { useTimeline } from '../hooks/useTimeline';
import { colors, margins, spacing, typography } from '~/lib/theme/theme';

interface ChaptersTimelineProps {
  chapters: Chapter[];
  currentLesson: Lesson | null;
  currentChapter: Chapter | null;
  onChapterLayout: (chapterId: string, event: any) => void;
  onLessonAction: (lessonId: string, action: 'start' | 'review') => void;
  scrollViewRef: any;
}

export const ChaptersTimeline: React.FC<ChaptersTimelineProps> = ({
  chapters,
  currentLesson,
  currentChapter,
  onLessonAction,
  scrollViewRef,
}) => {
  const { chaptersWithPositions } = useTimeline({ chapters, currentLesson });
  const [currentLessonY, setCurrentLessonY] = useState<number | null>(null);
  const currentChapterId = currentChapter?.id;

  useEffect(() => {
    if (currentLessonY !== null && scrollViewRef?.current) {
      scrollViewRef.current.scrollTo({ y: currentLessonY, animated: true });
    }
  }, [currentLessonY, scrollViewRef]);

  return (
    <VStack space="xs">
      {chaptersWithPositions.map(({ chapter, lessons }) => (
        <Box key={chapter.id}>
          <VStack
            style={{
              alignItems: 'center',
              marginBottom: spacing.spacingSmall,
            }}
          >
            <View
              style={{
                height: 1,
                backgroundColor: colors.GreyL30,
                width: '100%',
                marginBottom: margins.marginSmall,
              }}
            />
            {chapter.id !== currentChapterId && (
              <Box>
                <Text
                  color={colors.Grey}
                  fontSize={typography.heading3Size}
                  fontWeight={typography.fontWeightRegular}
                  textAlign="center"
                >
                  Chapitre {chapter.order} : {chapter.title}
                </Text>
              </Box>
            )}
          </VStack>
          <VStack space={spacing.spacingLargeFallback} mb={margins.marginLarge}>
            {lessons.map(({ lesson, positionStyle, isCurrent }) => (
              <View
                key={lesson.id}
                style={{
                  alignSelf: 'center',
                  ...positionStyle,
                }}
                onLayout={(event) => {
                  if (isCurrent) {
                    setCurrentLessonY(event.nativeEvent.layout.y);
                  }
                }}
              >
                <LessonCircle lesson={lesson} onAction={onLessonAction} isCurrent={isCurrent} />
              </View>
            ))}
          </VStack>
        </Box>
      ))}
    </VStack>
  );
};
