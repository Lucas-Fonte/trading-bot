import { spawn } from 'child_process';
import { IMarketData } from '../watchers/marketWatcher';

const MARKET_DATA_SOURCE = 'getMarketData';
const ENVIRONMENT = process.env.ENVIRONMENTAL_ACTIONS || 'staged';
const getMarketData = async (symbol: string): Promise<IMarketData> => {
  const marketData: any = {};

  console.log('Starting python trader...');

  const path = `src/python/${ENVIRONMENT}/${MARKET_DATA_SOURCE}.py`;

  console.log({ path });

  const pythonProgram = spawn('python', [path, `--symbol=${symbol}`]);

  for await (const data of pythonProgram.stdout) {
    Object.assign(marketData, JSON.parse(data.toString()));
  }

  console.log('Done getting data');

  const currentMarketData: IMarketData = {
    ask: marketData.ask,
    bid: marketData.bid,
    flags: marketData.flags,
    last: marketData.last,
    symbol,
    time: marketData.time,
    time_msc: marketData.time_msc,
    volume: marketData.volume,
    volume_real: marketData.volume_real,
  }

  return currentMarketData;
};

// getMarketData('WINV20');

export { getMarketData };

