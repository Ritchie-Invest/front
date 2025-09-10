import { UserETFListContract } from '../contracts/UserETFListContract';
import { UserPossessedETF } from '~/features/etf/models/UserPossessedETF';
import { UserETFListService } from '../services/UserETFListService';
import { validateUserPossessedETF } from '~/features/etf/validation/UserPossessedETFValidation';
export class UserETFListServiceAdapter implements UserETFListContract {
  async getAllUserETFs(): Promise<UserPossessedETF[]> {
    const etfs = await UserETFListService.getAllUserETFs();

    if (!etfs.every(validateUserPossessedETF)) {
      throw new Error('Invalid User ETF data received from service');
    }

    return etfs;
  }
}
