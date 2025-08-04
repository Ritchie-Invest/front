import { ETFDataService } from '../contracts/ETFContract';
import { ETFService } from '../services/etfService';
import { ETFWithCurrentPrice } from '../models/ETFWithCurrentPrice';
import { validateETFList } from '../validation/ETFValidation';

export class ETFServiceAdapter implements ETFDataService {
  async getAllETFs(): Promise<ETFWithCurrentPrice[]> {
    const etfs = await ETFService.getAllETFs();

    if (!validateETFList(etfs)) {
      throw new Error('Invalid ETF data received from service');
    }

    return etfs;
  }
}
