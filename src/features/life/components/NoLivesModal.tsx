import React from 'react';
import { Text, VStack, HStack } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Modal } from '~/components/molecules/components/Modal';
import { Button } from '~/components/atoms/Button';
import { HeartIcon } from '~/components/atoms/HeartIcon';
import { Timer } from '~/components/atoms/Timer';
import { useLifeStore } from '../store/lifeStore';
import { MainStackParamList } from '~/navigation/AppNavigator';
import { typography, colors } from '~/lib/theme/theme';
import { NoLivesModalProps } from '../types/lifeTypes';
import { formatTimeRemaining } from '../validation/lifeValidation';

export const NoLivesModal: React.FC<NoLivesModalProps> = ({
  isOpen,
  onClose,
  shouldNavigateBack = false,
}) => {
  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const { lifeStatus } = useLifeStore();

  const handleGoHome = () => {
    onClose();
    if (shouldNavigateBack) {
      navigation.goBack();
    }
  };

  const hasLives = lifeStatus.livesRemaining > 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose} backgroundColor={colors.mainBackgroundColor}>
      <VStack space="lg" alignItems="center" width="100%">
        <Text
          fontSize={typography.heading1Size}
          fontWeight={typography.fontWeightBold}
          color={colors.primaryTextColor}
          textAlign="center"
        >
          {hasLives
            ? t('life.noLivesModal.hasLivesTitle', {
                count: lifeStatus.livesRemaining,
                life:
                  lifeStatus.livesRemaining === 1
                    ? t('life.noLivesModal.life')
                    : t('life.noLivesModal.lives'),
              })
            : t('life.noLivesModal.title')}
        </Text>

        <HeartIcon filled={hasLives} size="large" />

        <Text fontSize={typography.bodySize} color={colors.primaryTextColor} textAlign="center">
          {hasLives
            ? t('life.noLivesModal.hasLivesDescription')
            : t('life.noLivesModal.description')}
        </Text>

        {!hasLives && (
          <VStack space="sm" alignItems="center">
            <Text fontSize={typography.bodySmallSize} color={colors.primaryTextColor}>
              {t('life.noLivesModal.nextLifeIn')}
            </Text>
            <HStack space="xs" alignItems="center">
              <Timer
                timeInMs={lifeStatus.nextLifeIn}
                formatTime={formatTimeRemaining}
                size="large"
                fontWeight={typography.fontWeightBold}
                color={colors.lifeColor}
              />
            </HStack>
          </VStack>
        )}

        <Button onPress={handleGoHome} variant="primary">
          {t('life.noLivesModal.button')}
        </Button>
      </VStack>
    </Modal>
  );
};
