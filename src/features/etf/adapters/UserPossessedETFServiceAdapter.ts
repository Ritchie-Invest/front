import { UserPossessedETFServiceContract } from '../contracts/UserPossessedETFServiceContract';
import { UserPossessedETFService } from '../services/UserPossessedETFService';
import { UserPossessedETF } from '../models/UserPossessedETF';
import { validateUserPossessedETF } from '../validation/UserPossessedETFValidation';

export class UserPossessedETFServiceAdapter implements UserPossessedETFServiceContract {
  async getUserPossessedETF(tickerId: string): Promise<UserPossessedETF[]> {
    const userPossessedETF = await UserPossessedETFService.getUserPossessedETF(tickerId);

    if (!validateUserPossessedETF(userPossessedETF)) {
      throw new Error(
        'Invalid UserPossessedETF data received from service, shares or amount is not a number or is negative',
      );
    }

    return [userPossessedETF];
  }
}
