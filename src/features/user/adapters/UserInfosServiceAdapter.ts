import { UserInfosContract } from '../contracts/UserInfosContract';
import { userInfosService } from '../services/UserInfosService';
import { UserInfos } from '../models/userInfos';
import { validateUserInfos, validateUserId } from '../validation/UserInfosValidation';

export class UserInfosServiceAdapter implements UserInfosContract {
  async getUserInfos(): Promise<UserInfos> {
    try {
      const data = await userInfosService.getUserInfos();

      if (!validateUserInfos(data)) {
        throw new Error('Invalid user infos structure received from service');
      }

      return data;
    } catch (error) {
      console.error('UserInfosServiceAdapter: Error fetching user infos:', error);

      if (error instanceof Error) {
        if (error.message.includes('Network Error') || error.message.includes('fetch')) {
          throw new Error('Unable to fetch user infos. Please check your internet connection.');
        }

        if (error.message.includes('Invalid') || error.message.includes('validation')) {
          throw error;
        }
      }

      throw new Error('An unexpected error occurred while fetching user infos');
    }
  }
}
