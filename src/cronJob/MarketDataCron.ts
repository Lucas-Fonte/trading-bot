import cron from 'node-cron';
import { getMarketData } from '../core/getMarketData';
import { getUserInput } from '../core/getUserInput';
import { MarketWatcherRepository } from '../database/repositories/MarketWatcherRepository';
import { cronExpression } from '../tools/cronExpression';
import { logger } from '../tools/logger';
import { MarketLog, marketWatcher } from '../watchers/marketWatcher';
import { orderWatcher } from '../watchers/orderWatcher';

let dynamicRate = 0;
const JOB_RATE = dynamicRate ? dynamicRate : process.env.MARKET_DATA_JOB_RATE;

const MarketDataCron = {
  start: async () => {
    let counter = 0;

    logger.whiteTextWithYellowHighlight(
      'Job is running every ',
      `${JOB_RATE} seconds\n`
    );
    const userInput = getUserInput();
    const marketLogs: MarketLog[] = [];
    const watchers = await MarketWatcherRepository.findAll();

    console.log({ watchers });

    cron.schedule(cronExpression.resolve(JOB_RATE), async () => {
      const marketData = await getMarketData(userInput.symbol, counter);

      const { currentMarketData, actionTaken } = await marketWatcher(
        marketData,
        marketLogs
      );

      if (actionTaken) {
        orderWatcher(marketData);
      }

      marketLogs.push(currentMarketData);

      if (marketLogs.length >= 4) marketLogs.shift();

      counter++;
      logger.whiteTextWithGreenText('\nProcess ran: ', counter);
    });
  },
};

export { MarketDataCron };
