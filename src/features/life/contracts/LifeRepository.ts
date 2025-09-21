import { UserLifeResponse } from '../models/life';

export interface LifeRepository {
  getUserLifeStatus(): Promise<UserLifeResponse>;
}
