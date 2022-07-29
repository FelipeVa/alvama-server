import express, { Express, Request, Response } from 'express';
import {
  datasetExecutionService,
  datasetResultService,
  datasetService,
  forecastExecutionService,
  forecastResultService,
  forecastService,
} from './services';
import {
  storeDatasetRequest,
  storeExecutionRequest,
  storeForecastExecutionRequest,
} from './http/requests';
import { withRequestValidator } from './utils/common';

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
app.get('/datasets', async (req: Request, res: Response) => {
  const response = await datasetService.index();

  res.json(response);
});

app.post(
  '/datasets',
  withRequestValidator(storeDatasetRequest),
  async (req: Request, res: Response) => {
    const response = await datasetService.store(req.body);

    res.json(response);
  },
);

/**
 * Dataset Results
 */
app.get('/datasets/results', async (req: Request, res: Response) => {
  const response = await datasetResultService.index();

  res.json(response);
});

app.get('/datasets/results/:id', async (req: Request, res: Response) => {
  const response = await datasetResultService.show(req.params.id);

  if (!response) {
    return res.status(404).json({
      message: 'Result not found',
    });
  }

  res.json(response);
});

/**
 * Dataset Executions
 */
app.get('/datasets/executions', async (req: Request, res: Response) => {
  const response = await datasetExecutionService.index();

  res.json(response);
});

app.post(
  '/datasets/executions',
  withRequestValidator(storeExecutionRequest),
  async (req: Request, res: Response) => {
    const dataset = await datasetService.show(req.body.dataset_id);

    if (!dataset) {
      return res.status(404).json({
        message: 'Dataset not found',
      });
    }
    try {
      const response = await datasetExecutionService.store(req.body);

      res.json(response);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  },
);

/**
 * Dataset single resource actions
 */
app.get('/datasets/:id', async (req: Request, res: Response) => {
  const response = await datasetService.show(req.params.id);

  if (!response) {
    return res.status(404).json({
      message: 'Dataset not found',
    });
  }

  res.json(response);
});

app.delete('/datasets/:id', async (req: Request, res: Response) => {
  const response = await datasetService.destroy(req.params.id);

  if (!response) {
    return res.status(404).json({
      message: 'Dataset not found',
    });
  }

  res.json(response);
});

/**
 * Forecasts
 */

app.get('/forecasts', async (req: Request, res: Response) => {
  const response = await forecastService.index();

  res.json(response);
});

app.post('/forecasts', async (req: Request, res: Response) => {
  const response = await forecastService.store(req.body);

  res.json(response);
});

/**
 * Forecast Executions
 */
app.get('/forecasts/executions', async (req: Request, res: Response) => {
  const response = await forecastExecutionService.index();

  res.json(response);
});

app.post(
  '/forecasts/executions',
  withRequestValidator(storeForecastExecutionRequest),
  async (req: Request, res: Response) => {
    const forecast = await forecastService.show(req.body.forecast_id);

    if (!forecast) {
      return res.status(404).json({
        message: 'Forecast not found',
      });
    }
    try {
      const response = await forecastExecutionService.store(req.body);

      res.json(response);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  },
);

/**
 * Dataset Results
 */
app.get('/forecasts/results', async (req: Request, res: Response) => {
  const response = await forecastResultService.index();

  res.json(response);
});

app.get('/forecasts/results/:id', async (req: Request, res: Response) => {
  const response = await forecastResultService.show(req.params.id);

  if (!response) {
    return res.status(404).json({
      message: 'Result not found',
    });
  }

  res.json(response);
});

/**
 * Forecast single resource actions
 */

app.get('/forecasts/:id', async (req: Request, res: Response) => {
  const response = await forecastService.show(req.params.id);

  if (!response) {
    return res.status(404).json({
      message: 'Forecast not found',
    });
  }

  res.json(response);
});

app.delete('/forecasts/:id', async (req: Request, res: Response) => {
  const response = await forecastService.destroy(req.params.id);

  if (!response) {
    return res.status(404).json({
      message: 'Forecast not found',
    });
  }

  res.json(response);
});

app.listen(process.env.EXPRESS_SERVER_PORT, () => {
  console.log(
    `⚡️[server]: Server is running at http://localhost:${process.env.EXPRESS_SERVER_PORT}`,
  );
});
