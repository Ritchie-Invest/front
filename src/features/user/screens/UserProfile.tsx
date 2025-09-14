import React from 'react';
import { Box, Text, VStack, HStack, Divider, Center } from '@gluestack-ui/themed';
import { useCurrentUserInfos } from '~/features/user/store/UserInfosStore';
import { LogoutButton } from '~/features/user/components/logoutButton';
import { borderRadius, colors, margins, paddings, spacing, typography } from '~/lib/theme/theme';
import { ScrollView } from 'react-native-gesture-handler';
import BadgesList from '~/features/badges/components/BadgesList';

export type UserProfileProps = {
  handleLogout?: () => void;
};

export default function UserProfile({ handleLogout }: UserProfileProps) {
  const user = useCurrentUserInfos();

  return (
    <ScrollView>
      <VStack space="md" flex={1} justifyContent="space-between">
        <Box gap={spacing.spacingLarge}>
          <Text
            size={typography.heading1SizeFallback}
            color={colors.primaryTextColor}
            fontWeight={typography.fontWeightBold}
          >
            Profil
          </Text>

          <Text color={colors.primaryTextColor} size={typography.bodySizeFallback}>
            {user?.email ?? ''}
          </Text>
          <Divider />
        </Box>

        <Box
          gap={spacing.spacingLarge}
          backgroundColor={colors.componentBackgroundColor}
          padding={paddings.paddingExtraLarge}
          borderRadius={borderRadius.borderRadiusMedium}
          shadowColor={colors.primaryTextColor}
          shadowOffset={{ width: 0, height: 2 }}
          shadowOpacity={0.15}
          shadowRadius={4}
          elevation={3}
          my={margins.marginMedium}
        >
          <VStack space="sm" justifyContent="center" alignItems="center">
            <Text fontSize={typography.heading2Size} width="100%" textAlign="center">
              🏆
            </Text>
            <Text
              color={colors.primaryTextColor}
              textAlign="center"
              size={typography.bodySizeFallback}
            >
              Niveau {user?.level ?? 0}
            </Text>
          </VStack>
          <VStack space="sm" justifyContent="center" alignItems="center">
            <Text fontSize={typography.heading2Size} width="100%" textAlign="center">
              ⚡
            </Text>
            <Text
              color={colors.primaryTextColor}
              textAlign="center"
              size={typography.bodySizeFallback}
            >
              XP Totale : {user?.totalXp ?? 0}
            </Text>
          </VStack>
          <VStack space="sm" justifyContent="center" alignItems="center">
            <Text fontSize={typography.heading2Size} width="100%" textAlign="center">
              💪
            </Text>
            <Text
              color={colors.primaryTextColor}
              textAlign="center"
              size={typography.bodySizeFallback}
            >
              Encore {user?.xpRequiredForNextLevel ?? 0} XP à gagner pour accéder au niveau{' '}
              {user?.level !== undefined ? user.level + 1 : 1} !
            </Text>
          </VStack>
        </Box>
        <Box
          gap={spacing.spacingLarge}
          backgroundColor={colors.componentBackgroundColor}
          padding={paddings.paddingExtraLarge}
          borderRadius={borderRadius.borderRadiusMedium}
          shadowColor={colors.primaryTextColor}
          shadowOffset={{ width: 0, height: 2 }}
          shadowOpacity={0.15}
          shadowRadius={4}
          elevation={3}
          my={margins.marginMedium}
        >
          <Text
            size={typography.heading2SizeFallback}
            color={colors.primaryTextColor}
            fontWeight={typography.fontWeightBold}
          >
            Mes badges
          </Text>
          <BadgesList />
        </Box>
        <Box flex={1} justifyContent="center" alignItems="center" flexDirection="row" width="100%">
          <Center>
            <LogoutButton handleLogout={handleLogout} />
          </Center>
        </Box>
      </VStack>
    </ScrollView>
  );
}
