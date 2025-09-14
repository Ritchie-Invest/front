import React from 'react';
import { Box, Text, VStack, HStack, Divider, Center } from '@gluestack-ui/themed';
import {
  useCurrentUserInfos,
  useClearCurrentUserInfos,
} from '~/features/user/store/UserInfosStore';
import { LogoutButton } from '~/features/user/components/logoutButton';
import { borderRadius, colors, paddings, spacing, typography } from '~/lib/theme/theme';

export type UserProfileProps = {
  handleLogout?: () => void;
};

export default function UserProfile({ handleLogout }: UserProfileProps) {
  const user = useCurrentUserInfos();

  return (
    <Box flex={1}>
      <VStack space="md">
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

        <Box
          gap={spacing.spacingSmall}
          backgroundColor={colors.componentBackgroundColor}
          padding={paddings.paddingMedium}
          borderRadius={borderRadius.borderRadiusMedium}
          shadowColor={colors.primaryTextColor}
          shadowOffset={{ width: 0, height: 2 }}
          shadowOpacity={0.15}
          shadowRadius={4}
          elevation={3}
        >
          <Text color={colors.primaryTextColor} size={typography.bodySizeFallback}>
            🏆 Level: {user?.level ?? 0}
          </Text>
          <Text color={colors.primaryTextColor} size={typography.bodySizeFallback}>
            ⚡ XP Totale : {user?.totalXp ?? 0}
          </Text>
          <Text color={colors.primaryTextColor} size={typography.bodySizeFallback}>
            📈 Encore {user?.xpRequiredForNextLevel ?? 0} XP à gagner pour accéder au niveau{' '}
            {user?.level !== undefined ? user.level + 1 : 1} !
          </Text>
        </Box>

        <Center>
          <LogoutButton handleLogout={handleLogout} />
        </Center>
      </VStack>
    </Box>
  );
}
