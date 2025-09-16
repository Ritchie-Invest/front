import { ETFListContract } from '../contracts/ETFListContract';
import { ETFListService } from '../services/ETFListService';
import { ETF } from '~/features/etf/models/ETF';
import { validateETFList } from '../validation/ETFListValidation';

export class ETFListServiceAdapter implements ETFListContract {
  async getAllETFs(): Promise<ETF[]> {
    const etfs = await ETFListService.getAllETFs();

    if (!validateETFList(etfs)) {
      throw new Error('Invalid ETF data received from service');
    }

    return etfs;
  }
}
