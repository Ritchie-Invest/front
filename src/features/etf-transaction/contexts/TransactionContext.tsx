import React, { createContext, useContext, ReactNode } from 'react';
import { useConversion, UseConversionReturn } from '../hooks/useConversion';
import { useTransaction, UseTransactionReturn } from '../hooks/useTransaction';

interface TransactionContextType {
  conversion: UseConversionReturn;
  transaction: Omit<UseTransactionReturn, 'handleTransaction'> & {
    handleTransaction: (transactionType: any) => Promise<void>;
  };
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

interface TransactionProviderProps {
  children: ReactNode;
}

export const TransactionProvider: React.FC<TransactionProviderProps> = ({ children }) => {
  const conversion = useConversion();
  const transaction = useTransaction();

  return (
    <TransactionContext.Provider value={{ conversion, transaction }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactionContext must be used within a TransactionProvider');
  }
  return context;
};
