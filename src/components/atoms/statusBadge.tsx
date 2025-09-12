import React from 'react';
import { Badge, Text } from 'native-base';
import { useTranslation } from 'react-i18next';
import { LessonStatus } from '~/features/landing/types/LessonStatus';
import { ChapterStatus } from '~/features/landing/types/ChapterStatus';

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
          bg: 'green.500',
          text: t('status.progress.completed'),
          textColor: 'white',
        };
      case LessonStatus.UNLOCKED:
      case ChapterStatus.UNLOCKED:
      case ChapterStatus.IN_PROGRESS:
        return {
          bg: 'blue.500',
          text: t('status.progress.current'),
          textColor: 'white',
        };
      case LessonStatus.LOCKED:
      case ChapterStatus.LOCKED:
        return {
          bg: 'gray.400',
          text: t('status.progress.locked'),
          textColor: 'white',
        };
      default:
        return {
          bg: 'blue.500',
          text: t('status.progress.current'),
          textColor: 'white',
        };
    }
  };

  const statusProps = getStatusProps();

  return (
    <Badge variant="solid" bg={statusProps.bg} rounded="md">
      <Text fontSize="xs" color={statusProps.textColor}>
        {statusProps.text}
      </Text>
    </Badge>
  );
};
