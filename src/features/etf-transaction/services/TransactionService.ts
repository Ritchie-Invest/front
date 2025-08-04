export const TransactionService = {
  calculateSharesFromAmount: (amount: number, currentPrice: number): number => {
    if (!amount || !currentPrice || currentPrice <= 0) return 0;
    return Number((amount / currentPrice).toFixed(4));
  },
  calculateAmountFromShares: (shares: number, currentPrice: number): number => {
    if (!shares || !currentPrice || currentPrice <= 0) return 0;
    return Number((shares * currentPrice).toFixed(2));
  },
};
