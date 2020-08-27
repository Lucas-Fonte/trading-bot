import './bootstrap';
import express from 'express';
import http from 'http';
import { createConnection } from 'typeorm';
import { CronJob } from './cronJob';
import { logger } from './tools/logger';

const PORT = process.env.SERVER_PORT || 8000;
const app: express.Application = express();
const server = http.createServer(app);

const startServer = async () => {
  logger.yellowText('Initializing database...');
  await createConnection();
  logger.greenText('Connected to database');

  CronJob.start();

  server.listen(PORT, () => {
    logger.whiteTextWithBlueText('\nServer running on port: ', PORT);
  });
};

startServer();
