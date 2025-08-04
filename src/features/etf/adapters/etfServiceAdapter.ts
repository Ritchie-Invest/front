import { ETFDataService } from '../contracts/etf.contract';
import { etfService } from '../services/etfService';
import { ETFWithCurrentPrice } from '../models/etf';
import { validateETFList } from '../validation/ETFValidation';

export class ETFServiceAdapter implements ETFDataService {
  async getAllETFs(): Promise<ETFWithCurrentPrice[]> {
    const etfs = await etfService.getAllETFs();

    if (!validateETFList(etfs)) {
      throw new Error('Invalid ETF data received from service');
    }

    return etfs;
  }
}
