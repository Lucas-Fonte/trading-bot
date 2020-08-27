import { getManager } from 'typeorm';
import { marketActionResolver } from './resolvers/marketActionResolver';
import { MarketData } from '../database/entities/MarketData';
import { sanitizer } from '../tools/sanitizer';

interface IMarketData {
    symbol: string,
    currentPrice: string,
    value: string,
    percentage: string,
}

export interface MarketLog extends IMarketData {
  timestamp: string
}

const marketWatcher = async (marketData:IMarketData, marketLogs: Array<MarketLog>) => {
  const currentMarketData: MarketLog = {
    ...marketData,
    currentPrice: sanitizer.cleanHTMLFromNumber(marketData.currentPrice),
    timestamp: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
  };

  const entityManager = getManager();

  const marketDataRegistry = entityManager.create(MarketData, {
    ...currentMarketData,
    currentPrice: Number(currentMarketData.currentPrice),
  });

  entityManager.save(marketDataRegistry);

  marketActionResolver(currentMarketData, marketLogs);

  console.log(currentMarketData);

  return currentMarketData;
};

export { marketWatcher };
