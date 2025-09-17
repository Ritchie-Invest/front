import { axiosInstance } from '../../../lib/api/axios';
import { UserInfos } from '../models/userInfos';
import { UserInfosContract } from '../contracts/UserInfosContract';

export const userInfosService: UserInfosContract = {
  async getUserInfos(): Promise<UserInfos> {
    const response = await axiosInstance.get<UserInfos>('/users/me');
    console.log('Received user infos:', response.data);
    return response.data;
  },
};
