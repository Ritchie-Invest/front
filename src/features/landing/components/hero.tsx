import React from 'react';
import { VStack, HStack, Text } from '@gluestack-ui/themed';
import { useTranslation } from 'react-i18next';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Card } from '~/components/molecules/components/card';
import { colors, margins, spacing, typography } from '~/lib/theme/theme';
import { Lesson } from '../models/responses/lesson';

interface HeroProps {
  chapterTitle: string;
  currentLesson: Lesson | null;
}

export const Hero: React.FC<HeroProps> = ({ chapterTitle, currentLesson }) => {
  const { t } = useTranslation();

  return (
    <VStack space={spacing.spacingMediumFallback} mb={margins.marginMedium}>
      <VStack space={spacing.spacingSmallFallback}>
        <HStack alignItems="center" space={spacing.spacingSmallFallback}>
          <FontAwesome5
            name="book"
            size={typography.bodySize}
            color={colors.primaryActionActiveColor}
          />
          <Text
            fontSize={typography.heading1Size}
            color={colors.primaryActionActiveColor}
            fontWeight={typography.fontWeightBold}
          >
            {chapterTitle}
          </Text>
        </HStack>
      </VStack>

      {currentLesson && (
        <Card variant="default">
          <VStack space={spacing.spacingSmallFallback}>
            <Text
              fontWeight={typography.fontWeightBold}
              fontSize={typography.bodyLargeSize}
              color={colors.primaryTextColor}
            >
              {currentLesson.title}
            </Text>
            <Text fontSize={typography.bodySmallSize} color={colors.mutedTextColor}>
              {currentLesson.description}
            </Text>
          </VStack>
        </Card>
      )}
    </VStack>
  );
};
