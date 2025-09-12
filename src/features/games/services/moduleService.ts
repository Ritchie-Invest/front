import { axiosInstance } from '../../../lib/api/axios';
import { GameModule } from '../models/module';

export const moduleService = {
  async getModule(moduleId: string): Promise<GameModule> {
    const response = await axiosInstance.get<GameModule>(`/modules/${moduleId}`);
    return response.data;
  },
};
