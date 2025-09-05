import React from 'react';
import { Box, HStack, Heading, Text } from 'native-base';
import { Icon } from '~/components/atoms/Icon';
import { Button } from '~/components/atoms/Button';
import { useTranslation } from 'react-i18next';

interface ReviewModeFeedbackProps {
  onContinue: () => void;
}

const ReviewModeFeedback: React.FC<ReviewModeFeedbackProps> = ({ onContinue }) => {
  const { t } = useTranslation();
  return (
    <Box
      position="absolute"
      bottom={0}
      left={0}
      right={0}
      bg="blue.50"
      px={4}
      py={6}
      borderTopRadius={24}
      shadow={2}
    >
      <HStack alignItems="center" space={2} mb={2}>
        <Icon name="visibility" color="blue.600" size="lg" />
        <Heading size="md" color="blue.700">
          {t('qcm.review')}
        </Heading>
      </HStack>
      <Text color="blue.700" fontSize="md" mb={4}>
        {t('qcm.highlightedCorrectAnswer')}
      </Text>
      <Button variant="info" onPress={onContinue}>
        {t('qcm.continue')}
      </Button>
    </Box>
  );
};

export default ReviewModeFeedback;
