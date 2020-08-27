/* eslint-disable no-return-await */
/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-syntax */
import fs from 'fs';
import { createConnection, getManager } from 'typeorm';
import { MarketData } from '../database/entities/MarketData';
import { MarketOrder } from '../database/entities/MarketOrder';

const generateFiles = async () => {
  await createConnection();

  const entityManager = getManager();

  console.log('Getting entities...');

  const orders = await entityManager.find(MarketOrder);
  const data = await entityManager.find(MarketData);

  console.log('Done getting entities');

  const folderName = new Date().toISOString().slice(0, 10);

  console.log('Generating files...');

  fs.mkdirSync(`data/${folderName}`, { recursive: true });
  fs.writeFileSync(`data/${folderName}/orders.json`, JSON.stringify(orders, null, 4));
  fs.writeFileSync(`data/${folderName}/data.json`, JSON.stringify(data, null, 4));

  console.log('Files are generated');

  console.log(getResults(await analyzeData(folderName, orders, data)));
};

const analyzeData = async (folderName: string, orders: MarketOrder[], data: MarketData[]) => {
  const results: any = [];
  console.log('Generating results...');

  for (const currentOrder of orders) {
    for (const currentData of data) {
      const baseCondition = new Date(currentData.timestamp) > new Date(currentOrder.timestamp);

      if (currentData.currentPrice >= currentOrder.positiveGain
          && baseCondition
          && currentOrder.action === 'BUYING') {
        results.push({
          situation: 'GAIN',
          currentData,
          currentOrder,
        });
        break;
      } else if (currentData.currentPrice <= currentOrder.negativeGain
        && baseCondition
        && currentOrder.action === 'SELLING') {
        results.push({
          situation: 'GAIN',
          currentData,
          currentOrder,
        });
        break;
      } else if (currentData.currentPrice <= currentOrder.negativeLoss
        && baseCondition
        && currentOrder.action === 'BUYING') {
        results.push({
          situation: 'LOSS',
          currentData,
          currentOrder,
        });
        break;
      } else if (currentData.currentPrice >= currentOrder.positiveLoss
        && baseCondition
        && currentOrder.action === 'SELLING') {
        results.push({
          situation: 'LOSS',
          currentData,
          currentOrder,
        });
        break;
      }
    }
  }
  console.log();
  fs.writeFileSync(`data/${folderName}/results.json`, JSON.stringify(results, null, 4));
  console.log('Results are generated');

  return await results;
};

const getResults = (results: any) => {
  console.log('Getting total...');
  let total = 0;
  let gains = 0;
  let losses = 0;
  for (const { situation } of results) {
    if (situation === 'GAIN') {
      gains++;
      total += 0.40;
    } else {
      losses++;
      total -= 0.40;
    }
  }

  return {
    gains,
    losses,
    ratio: `%${((gains / results.length) * 100).toFixed(2)}`,
    orders: results.length,
    Total: total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
  };
};

generateFiles();
