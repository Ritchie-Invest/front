import { TransactionType } from '../types/Transaction';
import { TransactionStatus } from '../types/TransactionStatus';

export interface TradingActionConfig {
  label: string;
  color: string;
  pastLabel: string;
  actionVerb: string;
  actionNoun: string;
}

export const TRADING_ACTION_CONFIG: Record<TransactionType, TradingActionConfig> = {
  [TransactionType.Buy]: {
    label: 'Acheter',
    color: '#10B981',
    pastLabel: 'Acheté',
    actionVerb: 'acheter',
    actionNoun: 'achat',
  },
  [TransactionType.Sell]: {
    label: 'Vendre',
    color: '#EF4444',
    pastLabel: 'Vendu',
    actionVerb: 'vendre',
    actionNoun: 'vente',
  },
};

export interface TradingFormData {
  amount: string;
  shares: string;
  inputMode: 'amount' | 'shares';
}

export interface TradingFormValidation {
  isValid: boolean;
  errorMessage?: string;
}

export interface TradingFormState extends TradingFormData {
  estimatedFees: number;
  isCalculatingFees: boolean;
  validationError: string | null;
}

// Types pour le portfolio utilisateur
export interface UserPortfolio {
  availableCash: number;
  positions: ETFPosition[];
}

export interface ETFPosition {
  etfID: number;
  shares: number;
  avgBuyPrice: number;
}
