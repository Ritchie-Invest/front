import { ModuleServiceAdapter } from '../adapters/ModuleServiceAdapter';

const moduleServiceAdapter = new ModuleServiceAdapter();

export const moduleService = {
  async getModule(moduleId: string) {
    return moduleServiceAdapter.getModule(moduleId);
  },
};
