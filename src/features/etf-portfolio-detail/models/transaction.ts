import { OperationType } from '../index';

export interface Transaction {
  id: string;
  assetName: string;
  type: OperationType;
  quantity: number;
  value: number;
  date: Date;
}
