import cron from 'node-cron';
import { getMarketData } from '../python/getMarketData';
import { getUserInput } from '../core/getUserInput';
import { logger } from '../tools/logger';
// eslint-disable-next-line no-unused-vars
import { MarketLog, marketWatcher } from '../watchers/marketWatcher';

const JOB_RATE = process.env.MARKET_DATA_JOB_RATE || 10;

const CRON_SCHEDULE_CONFIGURATION = ` */${JOB_RATE} * * * * *`;

const MarketDataCron = {
  start: async () => {
    let counter = 0;

    logger.whiteTextWithYellowHighlight('Job is running every ', `${JOB_RATE} seconds\n`);
    const userInput = getUserInput();
    const marketLogs: (MarketLog)[] = [];

    cron.schedule(CRON_SCHEDULE_CONFIGURATION, async () => {
      const marketData = await getMarketData(userInput.symbol);
      marketLogs.push(await marketWatcher(marketData, marketLogs));

      if (marketLogs.length >= 4) marketLogs.shift();

      counter++;
      logger.whiteTextWithGreenText('\nProcess ran: ', counter);
    });
  },
};

export { MarketDataCron };
