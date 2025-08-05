import { ConvertService } from '../services/ConversionService';
import { ConversionContract } from '../contracts/ConversionContracts';
import { ConversionRequest } from '../models/requests';
import { ConversionResponse } from '../models/responses';
import { validateConversionRequest } from '../validation/ConversionValidation';

export class ConversionServiceAdapter implements ConversionContract {
  convertEuroToShares(conversionRequest: ConversionRequest): ConversionResponse {
    if (!validateConversionRequest(conversionRequest)) {
      throw new Error(
        `Invalid conversion request: ${JSON.stringify(conversionRequest)}. ` +
          'Must have valid euroAmount and etfId.',
      );
    }

    return ConvertService.convertEuroToShares(conversionRequest);
  }
}
