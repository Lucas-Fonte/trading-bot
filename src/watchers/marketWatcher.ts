/* eslint-disable camelcase */
import { getManager } from 'typeorm';
import { MarketData } from '../database/entities/MarketData';
import { marketActionResolver } from './resolvers/marketActionResolver';

export interface IMarketData {
  ask: number;
  bid: number;
  flags: number;
  last: number;
  symbol: string;
  time: string;
  time_msc: number;
  volume: number;
  volume_real: number;
}

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

  marketActionResolver(currentMarketData, marketLogs);

  console.log(currentMarketData);

  return currentMarketData;
};

export { marketWatcher };

