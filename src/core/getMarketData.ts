import { spawn } from 'child_process';

const MARKET_DATA_SOURCE = 'getMarketData';
const ENVIROMENTAL_ACTIONS = 'examples';

const getMarketData = async (symbol: string) => {
  const marketData: any = {};

  console.log('Starting python trader...');
  const pythonProgram = spawn('python', [
    `src/python/${ENVIROMENTAL_ACTIONS}/${MARKET_DATA_SOURCE}.py`,
  ]);

  for await (const data of pythonProgram.stdout) {
    Object.assign(marketData, JSON.parse(data.toString()));
  }

  console.log('Done getting data');

  return { symbol, ...marketData };
};

export { getMarketData };
