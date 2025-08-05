import { useETFStore } from '../../etf/store/ETFStore';
import { PossessedValueRequest } from '../models/PosessedValueRequest';
import { PossessedValueResponse } from '../models/PosessedValueResponse';

export class PossessedValueService {
  static getPossessedValue(possessedValueRequest: PossessedValueRequest): PossessedValueResponse {
    const { selectedETF } = useETFStore.getState();

    if (!selectedETF || !selectedETF.currentPrice || !possessedValueRequest.userId) {
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
