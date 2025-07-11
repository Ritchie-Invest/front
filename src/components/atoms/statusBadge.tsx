import React from 'react';
import { Badge, Text } from 'native-base';
import { useTranslation } from 'react-i18next';
import { ProgressStatus } from '~/models/status';

interface StatusBadgeProps {
  status: ProgressStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const { t } = useTranslation();

  const getStatusProps = () => {
    switch (status) {
      case ProgressStatus.COMPLETED:
        return {
          bg: 'green.500',
          text: t('status.progress.completed'),
          textColor: 'white',
        };
      case ProgressStatus.CURRENT:
        return {
          bg: 'blue.500',
          text: t('status.progress.current'),
          textColor: 'white',
        };
      case ProgressStatus.LOCKED:
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
