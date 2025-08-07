import { useTransaction } from './useTransaction';
import { TransactionType } from '../types/TransactionType';

type Variant = 'primary' | 'secondary' | 'outline' | 'disabled';

interface UseTransactionButtonProps {
  transactionType: TransactionType;
  onTransactionResult?: (result: { success: boolean; message: string } | null) => void;
}

export const useTransactionButton = ({
  transactionType,
  onTransactionResult,
}: UseTransactionButtonProps) => {
  console.log('[useTransactionButton] Hook initialized with:', { transactionType });
  
  const { isLoading, handleTransaction } = useTransaction();

  const isButtonDisabled = isLoading;
  const buttonText = transactionType === TransactionType.Buy ? 'Acheter' : 'Vendre';
  const buttonVariant: Variant = transactionType === TransactionType.Buy ? 'primary' : 'secondary';

  console.log('[useTransactionButton] State computed:', {
    isLoading,
    isButtonDisabled,
    buttonText,
    buttonVariant,
  });

  const onButtonPress = async () => {
    console.log('[useTransactionButton] Button pressed, starting transaction:', { transactionType });
    
    try {
      const response = await handleTransaction(transactionType);
      console.log('[useTransactionButton] Transaction response received:', response);

      if (response?.status === 'success') {
        const actionText = transactionType === TransactionType.Buy ? 'Achat' : 'Vente';
        const result = {
          success: true,
          message: `${actionText} réalisé avec succès !`,
        };
        console.log('[useTransactionButton] Transaction successful, calling onTransactionResult:', result);
        onTransactionResult?.(result);
      }
    } catch (error) {
      const result = {
        success: false,
        message: error instanceof Error ? error.message : 'Une erreur est survenue',
      };
      console.error('[useTransactionButton] Transaction failed:', error);
      console.log('[useTransactionButton] Calling onTransactionResult with error:', result);
      onTransactionResult?.(result);
    }
  };

  return {
    isLoading,
    isButtonDisabled,
    buttonText,
    buttonVariant,
    onButtonPress,
  };
};
