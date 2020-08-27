/* eslint-disable max-len */
import chalk from 'chalk';

type LoggerParam = string | number

export const logger = {
  whiteTextWithYellowHighlight: (text: LoggerParam, highlight: LoggerParam) => console.log(text + chalk.bgYellowBright.black(highlight)),
  whiteTextWithBlueText: (text: LoggerParam, blueText: LoggerParam) => console.log(text + chalk.blue(blueText)),
  whiteTextWithGreenText: (text: LoggerParam, blueText: LoggerParam) => console.log(text + chalk.greenBright(blueText)),
  yellowText: (text: LoggerParam) => console.log(chalk.yellowBright(text)),
  yellowHighlight: (text: LoggerParam) => console.log(chalk.bgYellowBright.black(text)),
  greenText: (text: LoggerParam) => console.log(chalk.greenBright(text)),
};
