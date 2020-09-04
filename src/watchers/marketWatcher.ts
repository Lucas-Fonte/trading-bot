import { getManager } from 'typeorm';
import { IMarketData, MarketData } from '../database/entities/MarketData';
import { marketActionResolver } from './resolvers/marketActionResolver';

export interface MarketLog extends IMarketData {
  timestamp: string;
}

const marketWatcher = async (
  marketData: IMarketData,
  marketLogs: Array<MarketLog>
) => {
  const currentMarketData: MarketLog = {
    ...marketData,
    timestamp: new Date().toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
    }),
  };

  const entityManager = getManager();

  const marketDataRegistry = entityManager.create(MarketData, {
    ...currentMarketData,
  });

  entityManager.save(marketDataRegistry);

  const actionTaken = marketActionResolver(currentMarketData, marketLogs);

  console.log(currentMarketData);

  return { currentMarketData, actionTaken };
};

export { marketWatcher };
