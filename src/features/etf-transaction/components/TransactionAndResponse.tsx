import React from 'react';
import { useTransactionForm } from '../hooks/useTransaction';
import { ResponseMessage } from './ResponseMessage';
import { TransactionForm } from './TransactionForm';

export const TransactionAndResponse: React.FC = () => {
  const { error, response } = useTransactionForm();
  return (
    <>{response ? <ResponseMessage response={response} error={error} /> : <TransactionForm />}</>
  );
};
