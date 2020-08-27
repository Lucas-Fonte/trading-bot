import { MarketDataCron } from './MarketDataCron';

const CronJob = {
  start: async () => {
    await MarketDataCron.start();
  },
};

export { CronJob };
