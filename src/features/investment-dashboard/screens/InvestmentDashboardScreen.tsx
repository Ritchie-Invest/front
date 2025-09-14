import React from 'react';
import { Box, Text, VStack } from '@gluestack-ui/themed';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '~/navigation/AppNavigator';
import { PortfolioPie } from '~/features/etf-portfolio/components/PortfolioPie';
import { usePortfolio } from '~/features/etf-portfolio/hooks/usePortfolio';
import { ETFList } from '../components/ETFList';
import { colors, margins, paddings, spacing, typography } from '~/lib/theme/theme';
import PageCover from '~/components/organisms/components/PageCover';
import { Screens } from '~/features/navigation/Type/Screens';
import { useCurrentUserInfos } from '~/features/user/store/UserInfosStore';
import LockedOverlay from '../components/LockedOverlay';
import { config } from '~/lib/config';

export const InvestmentDashboardScreen: React.FC = () => {
  const lockDashboard = config.LOCK_DASHBOARD;
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const { loading: portfolioLoading, error: portfolioError } = usePortfolio();
  const currentUserInfos = useCurrentUserInfos();

  if (lockDashboard || (currentUserInfos && !currentUserInfos.isInvestmentUnlocked)) {
    return <LockedOverlay />;
  }
  const handlePortfolioPress = () => {
    navigation.navigate(Screens.PORTFOLIO);
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
        <PageCover title="Tableau de bord" Screen={Screens.DASHBOARD} size={250} />
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
