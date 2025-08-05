import { PossessedValueRequest } from '../models/requests';
import { PossessedValueResponse } from '../models/responses';

export interface PossessedValueContract {
  getPossessedValue(possessedValueRequest: PossessedValueRequest): PossessedValueResponse;
}
