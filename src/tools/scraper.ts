import puppeteer from 'puppeteer';

const scraper = async (url: string, scrapingFunction: puppeteer.EvaluateFn) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  console.log(`Content from: ${url}`);

  await page.goto(url);

  console.log('Loading...');
  await page.waitFor(5000);

  const data = await page.evaluate(scrapingFunction);

  await browser.close();

  return data;
};

export { scraper };
