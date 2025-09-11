export interface UserPossessedETFValues {
  shares: number;
  amount: number;
}

export interface UserPossessedETFListItem extends UserPossessedETFValues {
  id: string;
  name: string;
  symbol: string;
}
