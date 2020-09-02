/* eslint-disable no-undef */
import { spawn } from 'child_process';

const getMarketData = async (symbol: string) => {
  const marketData = {};

  console.log('Starting python trader...');
  const pythonProgram = spawn('python', ['tradingBot.py']);

  pythonProgram.stdout.on('data', (data) => {
    console.log('running python...');
    console.log(data.toString());
  });

  console.log('Done getting data');

  return { symbol, ...marketData };
};

getMarketData('WINV20');

export { getMarketData };
