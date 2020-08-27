import readlineSync from 'readline-sync';
import { logger } from '../tools/logger';

interface IUserInput {
    symbol: string
}

const DEFAULT_SYMBOL = 'EURUSD';

const getUserInput = () => {
  const userInput: IUserInput = {
    symbol: readlineSync.question('Which symbol do you want to look after? \n') || DEFAULT_SYMBOL,
  };

  logger.yellowHighlight(userInput.symbol);
  return userInput;
};

export { getUserInput };
