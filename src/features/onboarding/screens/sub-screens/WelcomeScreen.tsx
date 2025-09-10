import React from 'react';
import { View } from 'react-native';
import { VStack, Text } from '@gluestack-ui/themed';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../../components/atoms/Button';
import { colors, paddings, spacing, typography } from '~/lib/theme/theme';

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
        <Text
          fontSize={24}
          fontWeight={typography.fontWeightBold}
          textAlign="center"
          color={colors.primaryTextColor}
        >
          {t('onboarding.welcome.title')}
        </Text>

        <View style={{ flex: 1 }} />

        <VStack space={spacing.spacingMediumFallback} style={{ width: '100%' }}>
          <Button onPress={onStart}>{t('onboarding.welcome.startButton')}</Button>

          <Button variant="secondary" onPress={onLogin}>
            {t('onboarding.welcome.loginButton')}
          </Button>
        </VStack>
      </VStack>
    </View>
  );
};
