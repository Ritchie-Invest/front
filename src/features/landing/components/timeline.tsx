import React from 'react';
import { Box, VStack, View, Text } from '@gluestack-ui/themed';
import { LessonCircle } from './lessonCircle';
import { Chapter } from '../models/responses/chapter';
import { Lesson } from '../models/responses/lesson';
import { useTimeline } from '../hooks/useTimeline';
import { colors, margins, spacing, typography } from '~/lib/theme/theme';

interface ChaptersTimelineProps {
  chapters: Chapter[];
  currentLesson: Lesson | null;
  onChapterLayout: (chapterId: string, event: any) => void;
  onLessonAction: (lessonId: string, action: 'start' | 'review') => void;
}

export const ChaptersTimeline: React.FC<ChaptersTimelineProps> = ({
  chapters,
  currentLesson,
  onLessonAction,
}) => {
  const { chaptersWithPositions } = useTimeline({ chapters, currentLesson });

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
            <Box>
              <Text
                color={colors.Grey}
                fontSize={typography.heading3Size}
                fontWeight={typography.fontWeightRegular}
                textAlign="center"
              >
                Chapitre {chapter.order} :{chapter.title}
              </Text>
            </Box>
          </VStack>
          <VStack space={spacing.spacingLargeFallback} mb={margins.marginLarge}>
            {lessons.map(({ lesson, positionStyle, isCurrent }) => (
              <View
                key={lesson.id}
                style={{
                  alignSelf: 'center',
                  ...positionStyle,
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
