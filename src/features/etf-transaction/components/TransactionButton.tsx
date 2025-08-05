import React, { useState } from 'react';
import { VStack, Box } from 'native-base';
import { Button } from '~/components/atoms/Button';
import { useTransaction } from '../hooks/useTransaction';
import { TransactionType } from '../types/TransactionType';
import { TransactionStatus } from './TransactionStatus';

interface TransactionButtonProps {
  transactionType: TransactionType;
  onTransactionResult?: (result: { success: boolean; message: string } | null) => void;
}

export const TransactionButton: React.FC<TransactionButtonProps> = ({
  transactionType,
  onTransactionResult,
}) => {
  const { isLoading, handleTransaction } = useTransaction();

  const isButtonDisabled = isLoading;
  const buttonText = transactionType === TransactionType.Buy ? 'Acheter' : 'Vendre';
  const buttonVariant = transactionType === TransactionType.Buy ? 'primary' : 'secondary';

  const onButtonPress = async () => {
    try {
      const response = await handleTransaction(transactionType);

      if (response?.status === 'success') {
        const actionText = transactionType === TransactionType.Buy ? 'Achat' : 'Vente';
        onTransactionResult?.({
          success: true,
          message: `${actionText} réalisé avec succès !`,
        });
      }
    } catch (error) {
      onTransactionResult?.({
        success: false,
        message: error instanceof Error ? error.message : 'Une erreur est survenue',
      });
    }
  };

  return (
    <Box width="100%">
      <Button
        width="100%"
        variant={isButtonDisabled ? 'disabled' : buttonVariant}
        onPress={onButtonPress}
        isLoading={isLoading}
        isDisabled={isButtonDisabled}
      >
        {buttonText}
      </Button>
    </Box>
  );
};
