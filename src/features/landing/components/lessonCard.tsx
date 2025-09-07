import React from 'react';
import { VStack, HStack, Text, Icon } from '@gluestack-ui/themed';
import { useTranslation } from 'react-i18next';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Card } from '~/components/molecules/components/card';
import { Button } from '@gluestack-ui/themed';
import { StatusBadge } from '~/components/atoms/statusBadge';
import { Lesson } from '../models/responses/lesson';
import { ProgressStatus } from '../types/ProgressStatus';
import { computeProgressStatus } from '../utils/computeProgressStatus';
import { colors, margins, spacing, typography } from '~/lib/theme/theme';

interface LessonCardProps {
  lesson: Lesson;
  onAction: (lessonId: string, action: 'start' | 'review') => void;
}

export const LessonCard: React.FC<LessonCardProps> = ({ lesson, onAction }) => {
  const { t } = useTranslation();

  const { id, title, description, isUnlocked, completedModules, totalModules } = lesson;

  const status = computeProgressStatus(isUnlocked, completedModules, totalModules);
  const isCompleted = status === ProgressStatus.COMPLETED;
  const isLocked = status === ProgressStatus.LOCKED;

  const handleButtonPress = () => {
    if (!isLocked) {
      onAction(id, isCompleted ? 'review' : 'start');
    }
  };

  const getIconProps = () => {
    switch (status) {
      case ProgressStatus.COMPLETED:
        return {
          name: 'checkmark-circle' as const,
          color: colors.successColor,
        };
      case ProgressStatus.CURRENT:
        return {
          name: 'play-circle-outline' as const,
          color: colors.primaryActionColor,
        };
      case ProgressStatus.LOCKED:
        return {
          name: 'lock-closed' as const,
          color: colors.DarkGrey,
        };
      default:
        return {
          name: 'play-circle-outline' as const,
          color: colors.primaryActionColor,
        };
    }
  };

  const iconProps = getIconProps();

  return (
    <Card
      variant="lesson"
      mb={margins.marginMediumFallback}
      opacity={isLocked ? 0.6 : 1}
      bg={isLocked ? colors.Grey : colors.successColor}
      borderColor={isLocked ? colors.Grey : colors.successColor}
    >
      <VStack space={spacing.spacingMediumFallback}>
        <HStack
          space={spacing.spacingMediumFallback}
          alignItems="center"
          mb={margins.marginSmallFallback}
        >
          <Icon
            as={Ionicons}
            name={iconProps.name}
            color={iconProps.color}
            size={typography.bodySize}
          />
          <Text fontWeight="bold" color={isLocked ? '$gray500' : '$black'}>
            {id}
          </Text>
          {isLocked && (
            <Text
              fontSize={12}
              bg="$gray200"
              px={2}
              py={1}
              borderRadius="$md"
              color="$text600"
              fontWeight="bold"
            >
              {t('status.progress.locked').toUpperCase()}
            </Text>
          )}
        </HStack>

        <VStack space={spacing.spacingSmallFallback}>
          <Text fontWeight="bold" mb={1} color={isLocked ? '$gray500' : '$black'}>
            {title}
          </Text>
          <Text fontSize={14} color={isLocked ? '$gray400' : '$gray600'}>
            {description}
          </Text>
        </VStack>

        <HStack justifyContent="space-between" alignItems="center">
          <StatusBadge status={status} />
          {!isLocked && (
            <Button variant={isCompleted ? 'secondary' : 'primary'} onPress={handleButtonPress}>
              {isCompleted ? t('lesson.review') : t('lesson.start')}
            </Button>
          )}
        </HStack>

        {isLocked && (
          <Text fontSize={12} color="$text500" fontStyle="italic" mt={1}>
            {t('lesson.unlockMessage')}
          </Text>
        )}
      </VStack>
    </Card>
  );
};
