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
      bg={isSuccess ? colors.successBackgroundColor : colors.warningBackgroundColor}
      p={spacing.spacingLarge}
      gap={spacing.spacingMedium}
      borderRadius={borderRadius.borderRadius3xl}
      shadowColor={isSuccess ? colors.successBackgroundColor : colors.warningBackgroundColor}
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
              color={isSuccess ? colors.successColor : colors.errorColor}
            />
          )}
        />
        <Heading size="md" color={isSuccess ? colors.successColor : colors.errorColor}>
          {isSuccess ? t('game.success') : t('game.error')}
        </Heading>
      </HStack>
      {!isSuccess && (
        <>
          <Text
            fontWeight={typography.fontWeightBold}
            color={colors.errorColor}
            fontSize={typography.bodySize}
          >
            {t('game.correctAnswer')}
          </Text>
          <Text
            color={colors.errorColor}
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
