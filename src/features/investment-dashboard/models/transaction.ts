export type OperationType = 'Buy' | 'Sell';

export interface Transaction {
  etfId: number;
  userId: number;
  transactionValue: number;
  operationType: OperationType;
  quantity: number;
  date: Date;
}
