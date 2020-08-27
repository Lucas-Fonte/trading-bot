/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
import { getManager } from 'typeorm';
import { MarketOrder } from '../../database/entities/MarketOrder';
import { logger } from '../../tools/logger';
// eslint-disable-next-line no-unused-vars
import { MarketLog } from '../marketWatcher';
// eslint-disable-next-line no-unused-vars
import { MarketStrategy } from '../../database/entities/MarketStragety';

interface IMarketActionResolverState {
  firstLog?: MarketLog;
  secondLog?: MarketLog;
  currentMarketData?: MarketLog;
  marketLogs?: Array<MarketLog>
}

const marketStrategy: MarketStrategy = {
  id: 1,
  strategy: 'DEFAULT',
  positveFactor: 1,
  negativeFactor: 1,
};

const marketActionResolverState: IMarketActionResolverState = {};

const marketActionResolver = (currentMarketData: MarketLog, marketLogs: Array<MarketLog>) => {
  if (marketLogs.length <= 2) {
    return;
  }

  const [firstLog, secondLog] = marketLogs.reverse();

  marketActionResolverState.currentMarketData = currentMarketData;
  marketActionResolverState.marketLogs = marketLogs;
  marketActionResolverState.firstLog = firstLog;
  marketActionResolverState.secondLog = secondLog;

  checkForGreenCandles();
  checkForRedCandles();
};

const checkForGreenCandles = () => {
  const {
    firstLog: { currentPrice: firstLogPrice },
    secondLog: { currentPrice: secondLogPrice },
    currentMarketData: { currentPrice },
  } = marketActionResolverState;

  if (firstLogPrice > currentPrice && secondLogPrice > currentPrice) {
    takeAction('SELLING');
    return;
  }

  logger.whiteTextWithYellowHighlight(`Because of ${firstLogPrice} , ${secondLogPrice}, ${currentPrice} `, 'NOT SELLING');
};

const checkForRedCandles = () => {
  const {
    firstLog: { currentPrice: firstLogPrice },
    secondLog: { currentPrice: secondLogPrice },
    currentMarketData: { currentPrice },
  } = marketActionResolverState;

  if (firstLogPrice < currentPrice && secondLogPrice < currentPrice) {
    takeAction('BUYING');
    return;
  }

  logger.whiteTextWithYellowHighlight(`Because of ${firstLogPrice} , ${secondLogPrice}, ${currentPrice} `, 'NOT BUYING');
};

const takeAction = (action: string) => {
  const entityManager = getManager();
  const { currentPrice } = marketActionResolverState.currentMarketData;
  const marketOrderRegistry = entityManager.create(MarketOrder, {
    ...marketActionResolverState.currentMarketData,
    currentPrice: Number(currentPrice),
    action,
    positiveGain: Number(currentPrice) + (Number(process.env.MARKET_ACTION_BASE_POINTS) * marketStrategy.positveFactor),
    negativeGain: Number(currentPrice) - (Number(process.env.MARKET_ACTION_BASE_POINTS) * marketStrategy.negativeFactor),
    positiveLoss: Number(currentPrice) + (Number(process.env.MARKET_ACTION_BASE_POINTS) * marketStrategy.positveFactor),
    negativeLoss: Number(currentPrice) - (Number(process.env.MARKET_ACTION_BASE_POINTS) * marketStrategy.negativeFactor),

  });

  entityManager.save(marketOrderRegistry);
  logger.whiteTextWithYellowHighlight('Action: ', action);
};

export { marketActionResolver };
