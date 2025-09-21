import { HttpLifeRepository } from '../adapters/HttpLifeRepository';
import { LifeRepository } from '../contracts/LifeRepository';
import { UserLifeResponse } from '../models/life';

class LifeService {
  private repository: LifeRepository;

  constructor(repository: LifeRepository) {
    this.repository = repository;
  }

  async getUserLifeStatus(): Promise<UserLifeResponse> {
    return this.repository.getUserLifeStatus();
  }
}

export const lifeService = new LifeService(new HttpLifeRepository());
