import { Transaction } from '../models/Transaction';
import { TransactionRequest } from '../models/Request';
import { TransactionResponse } from '../models/Response';
import { TransactionType } from '../types/Transaction';
import { TransactionStatus } from '../types/TransactionStatus';
import { UserPortfolio } from '../models/FormConfig';

export interface TransactionService {
  executeTransaction(transaction: TransactionRequest): Promise<TransactionResponse>;
  getUserPortfolio(userId: string): Promise<UserPortfolio>;
  calculateTransactionFees(amount: number): Promise<number>;
  getETFPosition(
    userId: string,
    etfId: number,
  ): Promise<{ shares: number; avgBuyPrice: number } | null>;
}

export class MockTransactionService implements TransactionService {
  private static mockUserId = 'user-123';
  private static mockPortfolios: Map<string, UserPortfolio> = new Map([
    [
      MockTransactionService.mockUserId,
      {
        availableCash: 5000.0,
        positions: [
          { etfID: 1, shares: 50, avgBuyPrice: 145.2 },
          { etfID: 2, shares: 25, avgBuyPrice: 89.5 },
          { etfID: 3, shares: 75, avgBuyPrice: 172.51 },
        ],
      },
    ],
  ]);

  async executeTransaction(transaction: TransactionRequest): Promise<TransactionResponse> {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simuler une chance d'échec de 5%
    const isSuccess = Math.random() > 0.05;

    const totalAmount =
      transaction.type === TransactionType.Buy
        ? transaction.quantity * transaction.price + transaction.estimatedFees
        : transaction.quantity * transaction.price - transaction.estimatedFees;

    const response: TransactionResponse = {
      transaction: {
        quantity: transaction.quantity,
        etfId: transaction.etfId,
        userId: transaction.userId,
        type: transaction.type,
      },
      price: transaction.price,
      fees: transaction.estimatedFees,
      totalAmount,
      timestamp: new Date(),
      status: isSuccess ? TransactionStatus.Completed : TransactionStatus.Failed,
    };

    // Mettre à jour le portfolio mock si la transaction est réussie
    if (isSuccess) {
      this.updateMockPortfolio(transaction, totalAmount);
    }

    return response;
  }

  async getUserPortfolio(userId: string): Promise<UserPortfolio> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const portfolio = MockTransactionService.mockPortfolios.get(userId);
    if (!portfolio) {
      throw new Error('Portfolio non trouvé');
    }

    return { ...portfolio };
  }

  async calculateTransactionFees(amount: number): Promise<number> {
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Frais de 1% avec minimum de 2€ et maximum de 50€
    const feePercentage = 0.01;
    const minimumFee = 2.0;
    const maximumFee = 50.0;
    const calculatedFee = amount * feePercentage;

    return Math.min(Math.max(calculatedFee, minimumFee), maximumFee);
  }

  async getETFPosition(
    userId: string,
    etfId: number,
  ): Promise<{ shares: number; avgBuyPrice: number } | null> {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const portfolio = MockTransactionService.mockPortfolios.get(userId);
    if (!portfolio) return null;

    const position = portfolio.positions.find((p) => p.etfID === etfId);
    return position ? { shares: position.shares, avgBuyPrice: position.avgBuyPrice } : null;
  }

  private updateMockPortfolio(transaction: TransactionRequest, totalAmount: number): void {
    const portfolio = MockTransactionService.mockPortfolios.get(transaction.userId);
    if (!portfolio) return;

    if (transaction.type === TransactionType.Buy) {
      // Déduire l'argent
      portfolio.availableCash -= totalAmount;

      // Ajouter ou mettre à jour la position
      const existingPosition = portfolio.positions.find((p) => p.etfID === transaction.etfId);
      if (existingPosition) {
        const totalShares = existingPosition.shares + transaction.quantity;
        const totalValue =
          existingPosition.shares * existingPosition.avgBuyPrice +
          transaction.quantity * transaction.price;
        existingPosition.avgBuyPrice = totalValue / totalShares;
        existingPosition.shares = totalShares;
      } else {
        portfolio.positions.push({
          etfID: transaction.etfId,
          shares: transaction.quantity,
          avgBuyPrice: transaction.price,
        });
      }
    } else {
      // Vente
      portfolio.availableCash +=
        transaction.quantity * transaction.price - transaction.estimatedFees;

      const existingPosition = portfolio.positions.find((p) => p.etfID === transaction.etfId);
      if (existingPosition) {
        existingPosition.shares -= transaction.quantity;

        // Supprimer la position si toutes les parts sont vendues
        if (existingPosition.shares <= 0) {
          const index = portfolio.positions.indexOf(existingPosition);
          portfolio.positions.splice(index, 1);
        }
      }
    }
  }

  resetPortfolio(userId: string): void {
    MockTransactionService.mockPortfolios.set(userId, {
      availableCash: 5000.0,
      positions: [
        { etfID: 1, shares: 50, avgBuyPrice: 145.2 },
        { etfID: 2, shares: 25, avgBuyPrice: 89.5 },
        { etfID: 3, shares: 75, avgBuyPrice: 172.51 },
      ],
    });
  }

  getCurrentUserId(): string {
    return MockTransactionService.mockUserId;
  }
}
