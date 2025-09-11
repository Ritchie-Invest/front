import { UserPossessedETFListItem } from '~/features/etf/models/UserPossessedETF';

export interface UserETFListContract {
  getAllUserETFs(): Promise<UserPossessedETFListItem[]>;
}

export interface UserETFListProvider {
  (): Promise<UserPossessedETFListItem[]>;
}
