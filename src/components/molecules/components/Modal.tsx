import React from 'react';
import {
  Modal as GluestackModal,
  ModalBackdrop,
  ModalContent,
  ModalBody,
} from '@gluestack-ui/themed';
import { paddings } from '~/lib/theme/theme';
import { useModal } from '../hooks/useModal';
import type { UseModalProps } from '../hooks/useModal';

interface ModalProps extends UseModalProps {
  children: React.ReactNode;
  backgroundColor?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  openKey,
  children,
  backgroundColor,
}) => {
  const { visible, handleClose } = useModal({ isOpen, onClose, openKey });

  return (
    <GluestackModal isOpen={visible} onClose={handleClose}>
      <ModalBackdrop />
      <ModalContent p={paddings.paddingLarge} bg={backgroundColor}>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </GluestackModal>
  );
};
