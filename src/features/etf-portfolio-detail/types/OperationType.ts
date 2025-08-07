export enum Operation {
  BUY = 'Buy',
  SELL = 'Sell',
}

export type OperationType = keyof typeof Operation;
