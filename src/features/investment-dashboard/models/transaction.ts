export type OperationType = 'Buy' | 'Sell';

export interface Transaction {
  etfId: string;
  userId: number;
  transactionValue: number;
  operationType: OperationType;
  quantity: number;
  date: Date;
}
