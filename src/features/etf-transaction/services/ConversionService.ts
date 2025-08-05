import { useETFStore } from '../../etf/store/ETFStore';
import { ConversionRequest } from '../models/ConversionRequest';
import { ConversionResponse } from '../models/ConversionResponse';

export class ConvertService {
  static convertEuroToShares(conversionRequest: ConversionRequest): ConversionResponse {
    const { selectedETF } = useETFStore.getState();

    if (!selectedETF || !selectedETF.currentPrice || conversionRequest.euroAmount <= 0) {
      return {
        shares: 0,
      };
    }

    const shares =
      Math.round((conversionRequest.euroAmount / selectedETF.currentPrice) * 10000) / 10000;

    return {
      shares,
    };
  }
}
