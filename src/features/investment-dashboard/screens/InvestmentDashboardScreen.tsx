import React from 'react';
import { Box, Text, VStack } from '@gluestack-ui/themed';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '~/navigation/AppNavigator';
import { PortfolioPie } from '~/features/etf-portfolio/components/PortfolioPie';
import { usePortfolio } from '~/features/etf-portfolio/hooks/usePortfolio';
import { ETFList } from '../components/ETFList';
import { colors, margins, paddings, spacing } from '~/lib/theme/theme';

export const InvestmentDashboardScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const { loading: portfolioLoading, error: portfolioError } = usePortfolio();

  const handlePortfolioPress = () => {
    navigation.navigate('PortfolioDetail');
  };

  if (portfolioError) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" px={paddings.paddingSmall}>
        <Text fontSize={18} color={colors.errorColor} textAlign="center" mb={margins.marginSmall}>
          Erreur lors du chargement du portfolio
        </Text>
        <Text fontSize={14} color={colors.primaryTextColor} textAlign="center">
          {portfolioError}
        </Text>
      </Box>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.mainBackgroundColor }}>
      <VStack bg={colors.mainBackgroundColor} space={spacing.spacingMediumFallback}>
        <Box>
          <PortfolioPie onPress={handlePortfolioPress} />
        </Box>
        <Box flex={1} backgroundColor={colors.alternativeBackgroundColor}>
          <ETFList />
        </Box>
      </VStack>
    </ScrollView>
  );
};
