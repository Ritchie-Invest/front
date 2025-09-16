import React from 'react';
import { Box, Text } from '@gluestack-ui/themed';
import { useTranslation } from 'react-i18next';
import { LessonStatus } from '~/features/landing/types/LessonStatus';
import { ChapterStatus } from '~/features/landing/types/ChapterStatus';
import { colors, borderRadius, paddings } from '~/lib/theme/theme';

interface StatusBadgeProps {
  status: LessonStatus | ChapterStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const { t } = useTranslation();

  const getStatusProps = () => {
    switch (status) {
      case LessonStatus.COMPLETED:
      case ChapterStatus.COMPLETED:
        return {
          backgroundColor: colors.successColor,
          text: t('status.progress.completed'),
        };
      case LessonStatus.UNLOCKED:
      case ChapterStatus.UNLOCKED:
      case ChapterStatus.IN_PROGRESS:
        return {
          backgroundColor: colors.primaryActionColor,
          text: t('status.progress.current'),
        };
      case LessonStatus.LOCKED:
      case ChapterStatus.LOCKED:
        return {
          backgroundColor: colors.GreyL30,
          text: t('status.progress.locked'),
        };
      default:
        return {
          backgroundColor: colors.primaryActionColor,
          text: t('status.progress.current'),
        };
    }
  };

  const statusProps = getStatusProps();

  return (
    <Box
      bg={statusProps.backgroundColor}
      borderRadius={borderRadius.borderRadiusSmall}
      px={paddings.paddingSmall}
      py={paddings.paddingVerySmall}
    >
      <Text fontSize={12} color={colors.secondaryTextColor}>
        {statusProps.text}
      </Text>
    </Box>
  );
};
