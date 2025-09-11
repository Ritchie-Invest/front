import { UserETFListContract } from '../../etf/contracts/UserETFListContract';
import { UserPossessedETFListItem } from '../models/UserPossessedETF';
import { UserETFListService } from '../../etf/services/UserETFListService';
import { validateUserPossessedETF } from '~/features/etf/validation/UserPossessedETFValidation';

export class UserETFListServiceAdapter implements UserETFListContract {
  async getAllUserETFs(): Promise<UserPossessedETFListItem[]> {
    const etfs = await UserETFListService.getAllUserETFs();

    if (!etfs.every(validateUserPossessedETF)) {
      throw new Error('Invalid User ETF data received from service');
    }

    return etfs;
  }
}
