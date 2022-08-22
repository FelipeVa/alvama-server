import express, { Express, NextFunction, Request, Response } from 'express';
import {
  storeDatasetRequest,
  storeExecutionRequest,
  storeForecastExecutionRequest,
} from './http/requests';
import {
  authController,
  dashboardController,
  datasetController,
  datasetExecutionController,
  datasetResultController,
  forecastController,
  forecastExecutionController,
  forecastResultController,
} from './http/controllers';
import { asyncHandler, withRequestValidatorMiddleware } from './utils/common';
import { authMiddleware, guestMiddleware } from './http/middlewares';
import { loginRequest } from './http/requests/login.request';

const app: Express = express();
const cors = require('cors');
const dotenv = require('dotenv');
const createError = require('http-errors');

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
app.get('/', guestMiddleware, (req: Request, res: Response) => {
  res.send(`Express + TypeScript Serves`);
});

/**
 * Dashboard
 */
app.use('/dashboard', authMiddleware);
app.get(
  '/dashboard/stats/dataset-result/:id',
  dashboardController.showDatasetResultStat,
);

app.get(
  '/dashboard/stats/last-ten-results',
  dashboardController.showLastTenResults,
);

/**
 * Dataset
 */
app.use('/datasets', authMiddleware);
app.get('/datasets', datasetController.index);

app.post(
  '/datasets',
  withRequestValidatorMiddleware(storeDatasetRequest),
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
  withRequestValidatorMiddleware(storeExecutionRequest),
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
app.use('/forecasts', authMiddleware);
app.get('/forecasts', forecastController.index);
app.post('/forecasts', forecastController.store);

/**
 * Forecast Executions
 */
app.get('/forecasts/executions', forecastExecutionController.index);

app.post(
  '/forecasts/executions',
  withRequestValidatorMiddleware(storeForecastExecutionRequest),
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
 * Authentication
 */
app.get('/auth', authMiddleware, (req: Request, res: Response) => {
  res.json(req.auth);
});

app.post(
  '/auth/login',
  guestMiddleware,
  withRequestValidatorMiddleware(loginRequest),
  authController.login,
);

/**
 * Error handler
 */
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new createError.NotFound('Route not Found'));
});

app.use(
  (
    err: { message: any; status: number },
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction,
  ) => {
    res
      .status(err.status || 500)
      .json({
        status: err.status || 500,
        message: err.message || 'Something went wrong',
      })
      .end();
  },
);

/**
 * Starting server
 */
app.listen(process.env.EXPRESS_SERVER_PORT, () => {
  console.log(
    `⚡️[server]: Server is running at http://localhost:${process.env.EXPRESS_SERVER_PORT}`,
  );
});
