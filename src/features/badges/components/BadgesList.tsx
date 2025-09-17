import React, { useState } from 'react';
import { Box, Image, Text, VStack, HStack, Pressable } from '@gluestack-ui/themed';
import { Modal } from '~/components/molecules/components/Modal';
import { useGetBadges, useLockedBadges } from '../store/BadgeStore';
import { badgeTypeImageMap } from '../types/BadgeType';
import { colors, paddings, spacing, typography } from '~/lib/theme/theme';

const BadgesList: React.FC = () => {
  const badges = useGetBadges() || [];
  const lockedBadges = useLockedBadges() || [];
  const unlockedWithFlag = badges.map((b: any) => ({ ...b, locked: false }));
  const lockedWithFlag = lockedBadges.map((b: any) => ({ ...b, locked: true }));
  const allBadges = [...unlockedWithFlag, ...lockedWithFlag];
  const [selectedBadge, setSelectedBadge] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openBadge = (badge: any) => {
    setSelectedBadge(badge);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBadge(null);
  };

  return (
    <>
      <HStack justifyContent="space-between" flexWrap="wrap" flex={1} gap={spacing.spacingSmall}>
        {allBadges.map((badge: any, idx: number) =>
          badge.locked ? (
            <Box
              key={idx}
              width="30%"
              aspectRatio={1}
              padding={paddings.paddingMedium}
              alignItems="center"
            >
              <Image
                source={
                  badge.type
                    ? (badgeTypeImageMap[
                        badge.type as import('../types/BadgeType').BadgeType
                      ] as any)
                    : (Object.values(badgeTypeImageMap)[0] as any)
                }
                alt={badge.name}
                flex={1}
                style={{ opacity: 0.35 }}
                resizeMode="contain"
              />
              <Box
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                alignItems="center"
                justifyContent="center"
              >
                <Text fontSize={typography.heading2Size}>🔒</Text>
              </Box>
            </Box>
          ) : (
            <Pressable
              key={idx}
              width="30%"
              aspectRatio={1}
              padding={paddings.paddingMedium}
              alignItems="center"
              onPress={() => openBadge(badge)}
              accessibilityLabel={`badge-${badge.name}`}
            >
              <Image
                source={
                  badge.type
                    ? (badgeTypeImageMap[
                        badge.type as import('../types/BadgeType').BadgeType
                      ] as any)
                    : (Object.values(badgeTypeImageMap)[0] as any)
                }
                alt={badge.name}
                flex={1}
                resizeMode="contain"
                shadowColor={colors.warningColor}
                shadowOffset={{ width: 0, height: 4 }}
                shadowOpacity={0.5}
              />
            </Pressable>
          ),
        )}
      </HStack>

      <Modal
        backgroundColor={colors.warningBackgroundColor}
        isOpen={isModalOpen}
        onClose={closeModal}
        openKey={selectedBadge?.id}
      >
        {selectedBadge && (
          <>
            <Image
              source={
                selectedBadge.type
                  ? (badgeTypeImageMap[
                      selectedBadge.type as import('../types/BadgeType').BadgeType
                    ] as any)
                  : (Object.values(badgeTypeImageMap)[0] as any)
              }
              alt={selectedBadge.name}
              style={{ width: 120, height: 120 }}
              resizeMode="contain"
              shadowColor={colors.warningColor}
              shadowOffset={{ width: 0, height: 4 }}
              shadowOpacity={0.5}
            />
            <Text
              fontSize={typography.heading2Size}
              color={colors.primaryTextColor}
              mt={spacing.spacingSmall}
            >
              {selectedBadge.name}
            </Text>
            <Text
              fontSize={typography.bodySize}
              color={colors.primaryTextColor}
              textAlign="center"
              mt={spacing.spacingVerySmall}
            >
              {selectedBadge.description}
            </Text>
          </>
        )}
      </Modal>
    </>
  );
};

export default BadgesList;
