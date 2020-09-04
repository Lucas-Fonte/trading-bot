import { getManager } from 'typeorm';
import { MarketOrder } from '../../database/entities/MarketOrder';
import { MarketStrategy } from '../../database/entities/MarketStragety';
import { logger } from '../../tools/logger';
import { MarketLog } from '../marketWatcher';

interface IMarketActionResolverState {
  firstLog?: MarketLog;
  secondLog?: MarketLog;
  currentMarketData?: MarketLog;
  marketLogs?: Array<MarketLog>;
  actionTaken?: boolean;
}

const marketStrategy: MarketStrategy = {
  id: 1,
  strategy: 'DEFAULT',
  positveFactor: 2.5,
  negativeFactor: 1,
};

const marketActionResolverState: IMarketActionResolverState = {};

const marketActionResolver = (
  currentMarketData: MarketLog,
  marketLogs: Array<MarketLog>
) => {
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

  return marketActionResolverState.actionTaken || false;
};

const checkForGreenCandles = () => {
  const {
    firstLog: { last: firstLogValue },
    secondLog: { last: secondLogValue },
    currentMarketData: { last },
  } = marketActionResolverState;

  if (firstLogValue > last && secondLogValue > last) {
    takeAction('SELLING');
    return;
  }

  logger.whiteTextWithYellowHighlight(
    `Because of ${firstLogValue} , ${secondLogValue}, ${last} `,
    'NOT SELLING'
  );
};

const checkForRedCandles = () => {
  const {
    firstLog: { last: firstLogValue },
    secondLog: { last: secondLogValue },
    currentMarketData: { last },
  } = marketActionResolverState;

  if (firstLogValue < last && secondLogValue < last) {
    takeAction('BUYING');
    return;
  }

  logger.whiteTextWithYellowHighlight(
    `Because of ${firstLogValue} , ${secondLogValue}, ${last} `,
    'NOT BUYING'
  );
};

const takeAction = (action: string) => {
  const entityManager = getManager();
  const { last } = marketActionResolverState.currentMarketData;
  const marketOrderRegistry = entityManager.create(MarketOrder, {
    ...marketActionResolverState.currentMarketData,
    last: Number(last),
    action,
    positiveGain:
      Number(last) +
      Number(process.env.MARKET_ACTION_BASE_POINTS) *
        marketStrategy.positveFactor,
    negativeGain:
      Number(last) -
      Number(process.env.MARKET_ACTION_BASE_POINTS) *
        marketStrategy.negativeFactor,
    positiveLoss:
      Number(last) +
      Number(process.env.MARKET_ACTION_BASE_POINTS) *
        marketStrategy.positveFactor,
    negativeLoss:
      Number(last) -
      Number(process.env.MARKET_ACTION_BASE_POINTS) *
        marketStrategy.negativeFactor,
  });

  entityManager.save(marketOrderRegistry);
  logger.whiteTextWithYellowHighlight('Action: ', action);
  marketActionResolverState.actionTaken = true;
};

export { marketActionResolver };
