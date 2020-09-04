import { getManager } from 'typeorm';
import { IMarketData, MarketData } from '../database/entities/MarketData';
import { python } from '../tools/python';

const MARKET_DATA_SOURCE = 'getMarketData';

const getMarketData = async (
  symbol: string,
  counter: number
): Promise<IMarketData> => {
  console.log('Starting trader...');

  const marketData = await python.run(MARKET_DATA_SOURCE, [
    `--symbol=${symbol}`,
  ]);

  // const entityManager = getManager();
  // const marketData = await entityManager.findOne(MarketData, counter);

  console.log('Done getting data');

  return { symbol, ...marketData };
};

export { getMarketData };
