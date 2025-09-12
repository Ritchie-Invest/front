import React from 'react';
import { Box, HStack, Heading, Text } from 'native-base';
import { Icon } from '~/components/atoms/Icon';
import { Button } from '~/components/atoms/Button';
import { useTranslation } from 'react-i18next';

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
      bg={isSuccess ? 'green.50' : 'orange.50'}
      px={4}
      py={6}
      borderTopRadius={24}
      shadow={2}
    >
      <HStack alignItems="center" space={2} mb={2}>
        <Icon
          name={isSuccess ? 'check-circle' : 'close'}
          color={isSuccess ? 'green.600' : 'orange.700'}
          size="lg"
        />
        <Heading size="md" color={isSuccess ? 'green.700' : 'orange.700'}>
          {isSuccess ? t('game.success') : t('game.error')}
        </Heading>
      </HStack>
      {!isSuccess && (
        <>
          <Text fontWeight="bold" color="orange.700" fontSize="md">
            {t('game.correctAnswer')}
          </Text>
          <Text color="orange.700" fontSize="lg" mb={4}>
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
