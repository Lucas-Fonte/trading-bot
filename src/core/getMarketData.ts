import { spawn } from 'child_process';

const MARKET_DATA_SOURCE = 'getMarketData';
const ENVIRONMENT = process.env.ENVIRONMENTAL_ACTIONS || 'staged';
const getMarketData = async (symbol: string) => {
  const marketData = {};

  console.log('Starting python trader...');

  const path = `src/python/${ENVIRONMENT}/${MARKET_DATA_SOURCE}.py`;

  const pythonProgram = spawn('python', [path, `--symbol=${symbol}`]);

  for await (const data of pythonProgram.stdout) {
    Object.assign(marketData, JSON.parse(data.toString()));
  }

  console.log('Done getting data');

  return { symbol, ...marketData };
};

getMarketData('WINV20');

export { getMarketData };
