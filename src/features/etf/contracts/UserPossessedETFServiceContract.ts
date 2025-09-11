import { UserPossessedETF } from '../models/UserPossessedETF';

export interface UserPossessedETFServiceContract {
  getUserPossessedETF(tickerId: string): Promise<UserPossessedETF[]>;
}

export interface UserPossessedETFProvider {
  (tickerId: string): Promise<UserPossessedETF[]>;
}
