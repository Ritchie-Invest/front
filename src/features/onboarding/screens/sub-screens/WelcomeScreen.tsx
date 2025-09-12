import React from 'react';
import { View } from 'react-native';
import { VStack, Text } from '@gluestack-ui/themed';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../../components/atoms/Button';
import { colors, margins, paddings, spacing, typography } from '~/lib/theme/theme';
import PageCover from '~/components/organisms/components/PageCover';
import { Screens } from '~/features/navigation/Type/Screens';

interface WelcomeScreenProps {
  onStart: () => void;
  onLogin: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart, onLogin }) => {
  const { t } = useTranslation();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.mainBackgroundColor,
        paddingHorizontal: paddings.paddingMedium,
        justifyContent: 'center',
      }}
    >
      <VStack space={spacing.spacingMediumFallback} alignItems="center">
        <PageCover title={t('onboarding.welcome.title')} Screen={Screens.ONBOARDING} size={250} />
        <View style={{ flex: 1, marginTop: margins.marginMedium }} />

        <VStack space={spacing.spacingMediumFallback} style={{ width: '80%' }}>
          <Button onPress={onStart}>{t('onboarding.welcome.startButton')}</Button>

          <Button variant="secondary" onPress={onLogin}>
            {t('onboarding.welcome.loginButton')}
          </Button>
        </VStack>
      </VStack>
    </View>
  );
};
