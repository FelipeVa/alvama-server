import express, { Express, Request, Response } from 'express';
import {
  storeDatasetRequest,
  storeExecutionRequest,
  storeForecastExecutionRequest,
} from './http/requests';
import {
  datasetController,
  datasetExecutionController,
  datasetResultController,
  forecastController,
  forecastExecutionController,
  forecastResultController,
} from './http/controllers';
import { asyncHandler, withRequestValidator } from './utils/common';

const app: Express = express();
const cors = require('cors');
const dotenv = require('dotenv');

/**
 * Loading environment variables from .env file
 */
dotenv.config();

/**
 * Loading middlewares
 */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: '1000kb' }));

/**
 * App routes
 */
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

/**
 * Dataset
 */
app.get('/datasets', datasetController.index);

app.post(
  '/datasets',
  withRequestValidator(storeDatasetRequest),
  datasetController.store,
);

/**
 * Dataset Results
 */
app.get('/datasets/results', datasetResultController.index);
app.get('/datasets/results/:id', datasetResultController.show);

/**
 * Dataset Executions
 */
app.get('/datasets/executions', datasetExecutionController.index);
app.post(
  '/datasets/executions',
  withRequestValidator(storeExecutionRequest),
  datasetExecutionController.store,
);

/**
 * Dataset single resource actions
 */
app.get('/datasets/:id', datasetController.show);
app.delete('/datasets/:id', asyncHandler(datasetController.destroy));

/**
 * Forecasts
 */

app.get('/forecasts', forecastController.index);
app.post('/forecasts', forecastController.store);

/**
 * Forecast Executions
 */
app.get('/forecasts/executions', forecastExecutionController.index);

app.post(
  '/forecasts/executions',
  withRequestValidator(storeForecastExecutionRequest),
  forecastExecutionController.store,
);

/**
 * Dataset Results
 */
app.get('/forecasts/results', forecastResultController.index);
app.get('/forecasts/results/:id', forecastResultController.show);

/**
 * Forecast single resource actions
 */

app.get('/forecasts/:id', forecastController.show);
app.delete('/forecasts/:id', forecastController.destroy);

/**
 * Error handler
 */
app.use((err: any, req: Request, res: Response) => {
  res.status(500).json({
    message: `Something went wrong: ${err.message}`,
  });
});

/**
 * Starting server
 */
app.listen(process.env.EXPRESS_SERVER_PORT, () => {
  console.log(
    `⚡️[server]: Server is running at http://localhost:${process.env.EXPRESS_SERVER_PORT}`,
  );
});
