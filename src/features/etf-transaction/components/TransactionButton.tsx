import React from 'react';
import { VStack } from 'native-base';
import { Button } from '~/components/atoms/Button';
import { useTransaction } from '../hooks/useTransaction';
import { TransactionType } from '../types/TransactionType';

interface TransactionButtonProps {
  transactionType: TransactionType;
}

export const TransactionButton: React.FC<TransactionButtonProps> = ({ transactionType }) => {
  const { isLoading, handleTransaction } = useTransaction();

  const isButtonDisabled = isLoading;

  const buttonText = transactionType === TransactionType.Buy ? 'Acheter' : 'Vendre';
  const buttonVariant = transactionType === TransactionType.Buy ? 'primary' : 'secondary';

  const onButtonPress = async () => {
    if (!handleTransaction) {
      return;
    }

    try {
      await handleTransaction(transactionType);
    } catch (error) {}
  };

  return (
    <VStack space={4} width="100%" p={2}>
      <Button
        width="100%"
        variant={isButtonDisabled ? 'disabled' : buttonVariant}
        onPress={onButtonPress}
        isLoading={isLoading}
        isDisabled={isButtonDisabled}
      >
        {buttonText}
      </Button>
    </VStack>
  );
};
