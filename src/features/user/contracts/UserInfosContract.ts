import { UserInfos } from '../models/userInfos';

export interface UserInfosContract {
  getUserInfos(): Promise<UserInfos>;
}
