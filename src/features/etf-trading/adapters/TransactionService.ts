import { MockTransactionService } from '../services/TransactionService';
import { TransactionRequest } from '../models/Request';
import { UserPortfolio } from '../models/FormConfig';

export class TransactionServiceAdapter {
  private transactionService = new MockTransactionService();
  private userId = this.transactionService.getCurrentUserId();

  async getUserPortfolio(): Promise<UserPortfolio> {
    return this.transactionService.getUserPortfolio(this.userId);
  }

  async calculateTradingFees(amount: number): Promise<number> {
    return this.transactionService.calculateTransactionFees(amount);
  }

  async submitTradingOrder(order: TransactionRequest): Promise<any> {
    const response = await this.transactionService.executeTransaction(order);

    return {
      orderId: `TXN-${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
      etfID: response.transaction.etfId,
      action: response.transaction.type,
      shares: response.transaction.quantity,
      price: response.price,
      totalAmount: response.totalAmount,
      fees: response.fees,
      timestamp: response.timestamp,
      status: response.status,
    };
  }

  async getETFPosition(etfID: number): Promise<{ shares: number; avgBuyPrice: number } | null> {
    return this.transactionService.getETFPosition(this.userId, etfID);
  }
}
