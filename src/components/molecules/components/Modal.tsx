import React, { useEffect, useState } from 'react';
import { Box, Pressable, Text, VStack, Modal as GluestackModal } from '@gluestack-ui/themed';
import { borderRadius, colors, paddings, spacing, typography } from '~/lib/theme/theme';
import { Dimensions } from 'react-native';
import { useModal } from '../hooks/useModal';
import type { UseModalProps } from '../hooks/useModal';

type Props = UseModalProps & {
  children: React.ReactNode;
  backgroundColor?: string;
};

const screenWidth = Dimensions.get('screen').width;
const modalWidth = screenWidth * 0.7;

export const Modal: React.FC<Props> = ({
  children,
  backgroundColor = colors.componentBackgroundColor,
  openKey,
  isOpen,
  onClose,
}) => {
  const { visible, handleClose, setVisible } = useModal({ isOpen, onClose, openKey });

  return (
    <GluestackModal isOpen={visible} onClose={handleClose}>
      <Pressable
        flex={1}
        alignItems="center"
        justifyContent="center"
        onPress={handleClose}
        accessibilityLabel="modal-backdrop"
        style={{
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.18,
          shadowRadius: 16,
          shadowColor:
            backgroundColor === colors.componentBackgroundColor
              ? colors.primaryTextColor
              : backgroundColor,
          elevation: 12,
        }}
      >
        <Pressable
          onPress={() => {}}
          accessibilityLabel="modal-content"
          style={
            {
              backgroundColor,
              borderRadius: borderRadius.borderRadiusMedium,
              padding: paddings.paddingMedium,
              width: modalWidth,
            } as unknown as any
          }
        >
          <VStack space="md" alignItems="flex-start">
            <Pressable
              onPress={handleClose}
              accessibilityLabel="close-modal"
              style={{ position: 'absolute', top: 8, right: 8, zIndex: 2 }}
            >
              <Text fontSize={typography.bodySize}>✕</Text>
            </Pressable>

            <Box width="100%" paddingTop={paddings.paddingLarge} alignItems="center">
              {children}
            </Box>
          </VStack>
        </Pressable>
      </Pressable>
    </GluestackModal>
  );
};
