export type LifeDisplaySize = 'normal' | 'large';

export interface LifeDisplayProps {
  showTimer?: boolean;
  size?: LifeDisplaySize;
}

export interface NoLivesModalProps {
  isOpen: boolean;
  onClose: () => void;
  shouldNavigateBack?: boolean;
}
