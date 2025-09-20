import { useState, useEffect } from 'react';

export type UseModalProps = {
  isOpen?: boolean;
  onClose?: () => void;
  openKey?: any;
};

export function useModal({ isOpen, onClose, openKey }: UseModalProps) {
  const [visible, setVisible] = useState<boolean>(isOpen !== undefined ? !!isOpen : true);

  useEffect(() => {
    if (isOpen === undefined) {
      setVisible(true);
    }
  }, [openKey, isOpen]);

  useEffect(() => {
    if (isOpen !== undefined) setVisible(!!isOpen);
  }, [isOpen]);

  const handleClose = () => {
    if (onClose) onClose();
    if (isOpen === undefined) setVisible(false);
  };

  return { visible, handleClose, setVisible };
}
