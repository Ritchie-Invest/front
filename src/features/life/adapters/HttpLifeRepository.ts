import { axiosInstance } from '~/lib/api/axios';
import { LifeRepository } from '../contracts/LifeRepository';
import { UserLifeResponse } from '../models/life';
import { validateUserLifeResponse } from '../validation/lifeValidation';

export class HttpLifeRepository implements LifeRepository {
  private static readonly BASE_URL = '/users/me';

  async getUserLifeStatus(): Promise<UserLifeResponse> {
    const response = await axiosInstance.get(HttpLifeRepository.BASE_URL);
    const userData: UserLifeResponse = {
      livesRemaining: response.data.life,
      nextLifeIn: response.data.nextLifeIn,
    };

    if (!validateUserLifeResponse(userData)) {
      throw new Error('Invalid life data received from API');
    }

    return userData;
  }
}
