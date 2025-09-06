import React from 'react';
import { Box, Text } from '@gluestack-ui/themed';
import { useTranslation } from 'react-i18next';
import { ProgressStatus } from '~/features/landing/types/ProgressStatus';

interface StatusBadgeProps {
  status: ProgressStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const { t } = useTranslation();

  const getStatusProps = () => {
    switch (status) {
      case ProgressStatus.COMPLETED:
        return {
          backgroundColor: '#22c55e',
          text: t('status.progress.completed'),
        };
      case ProgressStatus.CURRENT:
        return {
          backgroundColor: '#3b82f6',
          text: t('status.progress.current'),
        };
      case ProgressStatus.LOCKED:
        return {
          backgroundColor: '#9ca3af',
          text: t('status.progress.locked'),
        };
      default:
        return {
          backgroundColor: '#3b82f6',
          text: t('status.progress.current'),
        };
    }
  };

  const statusProps = getStatusProps();

  return (
    <Box bg={statusProps.backgroundColor} borderRadius={6} px={8} py={4}>
      <Text fontSize={12} color="$white">
        {statusProps.text}
      </Text>
    </Box>
  );
};
