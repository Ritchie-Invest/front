import React from 'react';
import { Box, HStack, Heading, Text, Icon } from '@gluestack-ui/themed';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '~/components/atoms/Button';
import { useTranslation } from 'react-i18next';
import { colors, spacing, borderRadius, typography } from '~/lib/theme/theme';

interface FeedbackProps {
  type: 'success' | 'error';
  correctText?: string;
  onContinue: () => void;
}

const Feedback: React.FC<FeedbackProps> = ({ type, correctText, onContinue }) => {
  const { t } = useTranslation();
  const isSuccess = type === 'success';
  return (
    <Box
      position="absolute"
      bottom={0}
      left={0}
      right={0}
      bg={isSuccess ? colors.successBackgroundColor : colors.warningBackgroundColor}
      px={spacing.spacingMedium}
      py={spacing.spacingLarge}
      borderTopLeftRadius={borderRadius.borderRadius3xl}
      borderTopRightRadius={borderRadius.borderRadius3xl}
      shadowColor={colors.overlayColor}
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={0.1}
      shadowRadius={4}
      elevation={2}
    >
      <HStack alignItems="center" space={spacing.spacingSmallFallback} mb={spacing.spacingMinimum}>
        <Icon
          as={() => (
            <Ionicons
              name={isSuccess ? 'checkmark-circle' : 'close'}
              size={24}
              color={isSuccess ? colors.successColor : colors.warningColor}
            />
          )}
        />
        <Heading size="md" color={isSuccess ? colors.successColor : colors.warningColor}>
          {isSuccess ? t('game.success') : t('game.error')}
        </Heading>
      </HStack>
      {!isSuccess && (
        <>
          <Text
            fontWeight={typography.fontWeightBold}
            color={colors.warningColor}
            fontSize={typography.bodySize}
          >
            {t('game.correctAnswer')}
          </Text>
          <Text
            color={colors.warningColor}
            fontSize={typography.bodyLargeSize}
            mb={spacing.spacingMedium}
          >
            {correctText}
          </Text>
        </>
      )}
      <Button variant={isSuccess ? 'success' : 'error'} onPress={onContinue}>
        {isSuccess ? t('game.continue') : t('game.understood')}
      </Button>
    </Box>
  );
};

export default Feedback;
