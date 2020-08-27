/* eslint-disable no-undef */
import { scraper } from '../tools/scraper';

const BASE_URL = process.env.MARKET_BASE_URL;

const getMarketData = async (symbol: string) => {
  const marketUrl = BASE_URL + symbol;

  const marketData = await scraper(marketUrl, () => {
    const htmlClasses = {
      price: 'tv-symbol-price-quote__value js-symbol-last',
      value: 'js-symbol-change tv-symbol-price-quote__change-value',
      percentage: 'js-symbol-change-pt tv-symbol-price-quote__change-value',
    };

    const htmlGetter = (className: string) => {
      const [firstElement] = document.getElementsByClassName(className);
      return firstElement;
    };

    const currentPrice = htmlGetter(htmlClasses.price).innerHTML;
    const value = htmlGetter(htmlClasses.value).innerHTML;
    const percentage = htmlGetter(htmlClasses.percentage).innerHTML;

    return {
      currentPrice,
      value,
      percentage,
    };
  });

  return { symbol, ...marketData };
};

export { getMarketData };
