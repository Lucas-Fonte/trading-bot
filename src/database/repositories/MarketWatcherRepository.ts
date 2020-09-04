import { getManager } from 'typeorm';
import { MarketWatcher } from '../entities/MarketWatcher';

const MarketWatcherRepository = {
  findAll: async () => {
    const entityManager = getManager();
    return await entityManager.find(MarketWatcher);
  },
};

export { MarketWatcherRepository };
