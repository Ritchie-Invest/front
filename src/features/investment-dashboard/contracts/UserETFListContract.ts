import { UserPossessedETF } from '~/features/etf/models/UserPossessedETF';

export interface UserETFListContract {
  getAllUserETFs(): Promise<UserPossessedETF[]>;
}

export interface UserETFListProvider {
  (): Promise<UserPossessedETF[]>;
}
