import React from 'react';
import { Box, Image, Text, VStack, HStack } from '@gluestack-ui/themed';
import { useGetBadges } from '../store/BadgeStore';
import { badgeTypeImageMap } from '../types/BadgeType';
import { colors, paddings, spacing, typography } from '~/lib/theme/theme';

const BadgesList: React.FC = () => {
  const badges = useGetBadges() || [];

  if (!badges || badges.length === 0) {
    return (
      <Box padding={paddings.paddingLarge} alignItems="center">
        <Text fontSize={typography.bodySize} textAlign="center">
          🔒Vous n'avez débloqué aucun badge pour l'instant !
        </Text>
      </Box>
    );
  }

  const rows: any[] = [];
  for (let i = 0; i < badges.length; i += 4) {
    rows.push(badges.slice(i, i + 4));
  }

  return (
    <VStack space="md">
      {rows.map((row, rowIndex) => (
        <HStack
          key={rowIndex}
          justifyContent="space-between"
          width="100%"
          gap={spacing.spacingSmall}
        >
          {row.map((badge: any, idx: number) => (
            <Box key={idx} flex={1} padding={paddings.paddingMedium} alignItems="center">
              <Box padding={spacing.spacingSmall}>
                <Image
                  source={
                    badge.type
                      ? (badgeTypeImageMap[
                          badge.type as import('../types/BadgeType').BadgeType
                        ] as any)
                      : (Object.values(badgeTypeImageMap)[0] as any)
                  }
                  alt={badge.name}
                  style={{ width: 64, height: 64 }}
                  resizeMode="contain"
                />
              </Box>
              <Text
                fontSize={typography.bodySize}
                color={colors.primaryTextColor}
                textAlign="center"
                mt={spacing.spacingSmall}
              >
                {badge.name}
              </Text>
              <Text
                fontSize={typography.bodySmallSize}
                color={colors.secondaryTextColor}
                textAlign="center"
                mt={spacing.spacingVerySmall}
              >
                {badge.description}
              </Text>
            </Box>
          ))}
          {row.length < 4 &&
            Array.from({ length: 4 - row.length }).map((_, i) => (
              <Box key={`empty-${i}`} flex={1} />
            ))}
        </HStack>
      ))}
    </VStack>
  );
};

export default BadgesList;
