import { IMarketData } from '../database/entities/MarketData';
import { logger } from '../tools/logger';

const orderWatcher = async (marketData: IMarketData) => {
  logger.yellowHighlight('Order watcher is on');

  return marketData;
};

export { orderWatcher };
