import { UserPossessedETFValues } from '../models/UserPossessedETF';

export interface UserPossessedETFServiceContract {
  getUserPossessedETF(tickerId: string): Promise<UserPossessedETFValues[]>;
}

export interface UserPossessedETFProvider {
  (tickerId: string): Promise<UserPossessedETFValues[]>;
}
