import { axiosInstance } from '../../../lib/api/axios';

export const moduleService = {
  async getModule(moduleId: string): Promise<unknown> {
    const response = await axiosInstance.get(`/modules/${moduleId}`);
    return response.data;
  },
};
