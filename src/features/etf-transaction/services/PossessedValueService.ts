import { useETFStore } from '../../etf/store/ETFStore';
import { PossessedValueRequest } from '../models/requests';
import { PossessedValueResponse } from '../models/responses';

export class PossessedValueService {
  static getPossessedValue(possessedValueRequest: PossessedValueRequest): PossessedValueResponse {
    const { selectedETF } = useETFStore.getState();

    if (!selectedETF || !selectedETF.currentPrice) {
      return {
        value: 0,
      };
    }

    const value = Math.random() * 20;

    return {
      value,
    };
  }
}
