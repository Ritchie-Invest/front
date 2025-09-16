import React from 'react';
import { Box, Center, Text, VStack } from '@gluestack-ui/themed';
import { PostTransactionApiResponse } from '~/features/etf/models/Transaction';
import { borderRadius, colors, margins, paddings, spacing, typography } from '~/lib/theme/theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Button } from '~/components/atoms/Button';
import { useTransaction } from '../hooks/useTransaction';

type ResponseMessageProps = {
  response: PostTransactionApiResponse | null;
  error: string | null;
};

export const ResponseMessage: React.FC<ResponseMessageProps> = ({ response, error }) => {
  if (!response && !error) return null;
  const { goToInvestmentDashboard } = useTransaction();
  const isSuccess = response !== null;

  return (
    <Box
      bg={colors.mainBackgroundColor}
      p={paddings.paddingExtraLarge}
      borderRadius={borderRadius.borderRadiusMedium}
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={0.2}
      shadowRadius={3}
      elevation={2}
      width="100%"
      minHeight="40%"
    >
      {isSuccess && response ? (
        <Center width="100%" style={{ gap: spacing.spacingMedium }}>
          <Ionicons name="checkmark-circle" size={80} color={colors.successColor} />
          <Text
            color={colors.primaryTextColor}
            fontSize={typography.heading1Size}
            textAlign="center"
            fontWeight={typography.fontWeightBold}
          >
            {' '}
            Votre transaction est un succès !
          </Text>
          <Box width="100%" height={1} bg={colors.GreyL30} my={spacing.spacingMedium} />
          <Text
            color={colors.primaryTextColor}
            fontSize={typography.heading3Size}
            textAlign="center"
            fontWeight={typography.fontWeightMedium}
          >
            {' '}
            Voici vos nouveaux soldes :
          </Text>

          <Text color={colors.DarkGrey} width="100%" textAlign="left">
            💰 Solde: {response.cash.toFixed(2)} €
          </Text>
          <Text color={colors.DarkGrey} width="100%" textAlign="left">
            📈 Investissements: {response.investments.toFixed(2)} €
          </Text>
          <Text color={colors.DarkGrey} width="100%" textAlign="left">
            🏷️ Titres détenus: {response.tickerHoldings}
          </Text>
          <Center padding={paddings.paddingLarge}>
            <Button onPress={goToInvestmentDashboard} children="Retour au tableau de bord" />
          </Center>
        </Center>
      ) : (
        <Center width="100%" style={{ gap: spacing.spacingMedium }}>
          <Ionicons name="close-circle" size={80} color={colors.errorColor} />
          <Text
            color={colors.errorColor}
            fontSize={typography.heading1Size}
            textAlign="center"
            fontWeight={typography.fontWeightBold}
          >
            Une erreur est survenue
          </Text>
          <Text color={colors.errorColor} textAlign="center" fontSize={typography.heading6Size}>
            Nous vous invitons à réessayer ultérieurement et contacter le service technique si
            l'erreur persiste.
          </Text>
          <Center padding={paddings.paddingLarge}>
            <Button onPress={goToInvestmentDashboard} children="Retour au tableau de bord" />
          </Center>
        </Center>
      )}
    </Box>
  );
};
