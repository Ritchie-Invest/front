import React from 'react';
import {
  Modal as GluestackModal,
  ModalBackdrop,
  ModalContent,
  ModalBody,
} from '@gluestack-ui/themed';
import { paddings } from '~/lib/theme/theme';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  backgroundColor?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, backgroundColor }) => {
  return (
    <GluestackModal isOpen={isOpen} onClose={onClose}>
      <ModalBackdrop />
      <ModalContent p={paddings.paddingLarge} bg={backgroundColor}>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </GluestackModal>
  );
};
