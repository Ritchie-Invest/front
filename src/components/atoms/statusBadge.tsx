import React from 'react';
import { Box, Text } from '@gluestack-ui/themed';
import { useTranslation } from 'react-i18next';
import { ProgressStatus } from '~/features/landing/types/ProgressStatus';
import { colors } from '~/lib/theme/theme';

interface StatusBadgeProps {
  status: ProgressStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const { t } = useTranslation();

  const getStatusProps = () => {
    switch (status) {
      case ProgressStatus.COMPLETED:
        return {
          backgroundColor: colors.successColor,
          text: t('status.progress.completed'),
        };
      case ProgressStatus.CURRENT:
        return {
          backgroundColor: colors.primaryActionColor,
          text: t('status.progress.current'),
        };
      case ProgressStatus.LOCKED:
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
    <Box bg={statusProps.backgroundColor} borderRadius={6} px={8} py={4}>
      <Text fontSize={12} color={colors.secondaryTextColor}>
        {statusProps.text}
      </Text>
    </Box>
  );
};
