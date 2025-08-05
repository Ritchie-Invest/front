import React from 'react';
import { VStack, HStack, Text, Alert } from 'native-base';
import { Button } from '~/components/atoms/Button';
import { useTransaction } from '../hooks/useTransaction';
import { TransactionType } from '../types/TransactionType';

interface TransactionButtonProps {
  transactionType: TransactionType;
}

export const TransactionButton: React.FC<TransactionButtonProps> = ({ transactionType }) => {
  const { isLoading, message, messageType, handleTransaction, clearMessage } = useTransaction();

  const isButtonDisabled = isLoading;

  const buttonText = transactionType === TransactionType.Buy ? 'Acheter' : 'Vendre';
  const buttonVariant = transactionType === TransactionType.Buy ? 'primary' : 'secondary';

  return (
    <VStack space={4} width="100%">
      <Button
        width="100%"
        variant={isButtonDisabled ? 'disabled' : buttonVariant}
        onPress={() => handleTransaction(transactionType)}
        isLoading={isLoading}
        isDisabled={isButtonDisabled}
      >
        {buttonText}
      </Button>

      {message && (
        <Alert
          status={messageType === 'success' ? 'success' : 'error'}
          variant="subtle"
          onTouchEnd={clearMessage}
        >
          <Alert.Icon />
          <Text color={messageType === 'success' ? 'green.600' : 'red.600'}>{message}</Text>
        </Alert>
      )}
    </VStack>
  );
};
