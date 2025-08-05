import { ConversionRequest } from '../models/requests';
import { ConversionResponse } from '../models/responses';

export interface ConversionContract {
  convertEuroToShares(conversionRequest: ConversionRequest): ConversionResponse;
}
