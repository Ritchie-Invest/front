import { PossessedValueService } from '../services/PossessedValueService';
import { PossessedValueContract } from '../contracts/PossessedValueContracts';
import { PossessedValueRequest } from '../models/requests';
import { PossessedValueResponse } from '../models/responses';
import { validatePossessedValueRequest } from '../validation/PossessedValueValidation';

export class PossessedValueServiceAdapter implements PossessedValueContract {
  getPossessedValue(possessedValueRequest: PossessedValueRequest): PossessedValueResponse {
    if (!validatePossessedValueRequest(possessedValueRequest)) {
      throw new Error(
        `Invalid possessed value request: ${JSON.stringify(possessedValueRequest)}. ` +
          'Must have valid etfId.',
      );
    }

    return PossessedValueService.getPossessedValue(possessedValueRequest);
  }
}
