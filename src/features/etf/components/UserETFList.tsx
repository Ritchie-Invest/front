import React from 'react';
import { Box, HStack, Text } from '@gluestack-ui/themed';
import { MaterialIcons } from '@expo/vector-icons';
import { formatCurrency } from '../../../utils/formatCurrency';
import { List } from '../../../components/organisms/components/list';
import { colors, margins, paddings, spacing, typography } from '~/lib/theme/theme';
import { useUserETFList } from '../hooks/useUserETFList';

export const UserETFList: React.FC = () => {
  const { etfs, loading, hasError, hasNoETFs } = useUserETFList();

  if (hasError) {
    return (
      <Box width="100%" padding={paddings.paddingMedium}>
        <Text color={colors.errorColor}>Erreur lors du chargement des ETF</Text>
      </Box>
    );
  }

  if (hasNoETFs && !loading) {
    return (
      <Box width="100%" padding={paddings.paddingMedium} alignItems="center">
        <Text
          fontSize={16}
          color={colors.primaryTextColor}
          textAlign="center"
          mb={margins.marginSmall}
        >
          Effectuez votre première transaction pour voir vos ETFs s'afficher ici ! ✨
        </Text>
      </Box>
    );
  }

  return (
    <List
      data={etfs}
      loading={loading}
      title="Mes ETF"
      renderLeft={(etf) => (
        <>
          <HStack
            alignItems="center"
            space={spacing.spacingSmallFallback}
            mb={margins.marginMinimum}
          >
            <Text
              fontSize={typography.heading4Size}
              fontWeight={typography.fontWeightBold}
              color={colors.primaryTextColor}
            >
              {etf.symbol}
            </Text>
          </HStack>
          <Text fontSize={14} color={colors.DarkGrey}>
            {etf.name}
          </Text>
        </>
      )}
      renderRight={(etf) => (
        <>
          <Text fontSize={18} fontWeight="semibold" color="$black">
            {formatCurrency(etf.amount)}
          </Text>
          <Text fontSize={14} fontWeight={typography.fontWeightMedium}>
            {etf.shares.toFixed(3)} parts
          </Text>
        </>
      )}
    />
  );
};
