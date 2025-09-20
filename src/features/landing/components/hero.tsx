import React from 'react';
import { VStack, HStack, Text } from '@gluestack-ui/themed';
import { useTranslation } from 'react-i18next';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Card } from '~/components/molecules/components/card';
import { colors, margins, paddings, spacing, typography } from '~/lib/theme/theme';
import { Lesson } from '../models/responses/lesson';

interface HeroProps {
  chapterTitle: string;
  currentLesson: Lesson | null;
}

export const Hero: React.FC<HeroProps> = ({ chapterTitle, currentLesson }) => {
  const { t } = useTranslation();

  return (
    <VStack width="100%" gap={spacing.spacingLarge} mb={margins.marginMedium}>
      <Text
        fontSize={typography.heading1Size}
        color={colors.primaryActionActiveColor}
        fontWeight={typography.fontWeightBold}
        flex={1}
      >
        {chapterTitle}
      </Text>

      {currentLesson && (
        <Card variant="default">
          <VStack space={spacing.spacingSmallFallback}>
            <HStack width="100%" alignItems="center" space={spacing.spacingSmallFallback}>
              <FontAwesome5
                name="book"
                size={typography.bodySize}
                color={colors.primaryTextColor}
              />
              <Text
                fontWeight={typography.fontWeightBold}
                fontSize={typography.bodySize}
                color={colors.primaryTextColor}
              >
                {currentLesson.title}
              </Text>
            </HStack>
            <Text fontSize={typography.bodySmallSize} color={colors.mutedTextColor}>
              {currentLesson.description}
            </Text>
          </VStack>
        </Card>
      )}
    </VStack>
  );
};
