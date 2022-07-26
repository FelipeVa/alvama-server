import express, { Express, Request, Response } from 'express';
import { datasetService, executionService, resultService } from './services';
import { storeDatasetRequest, storeExecutionRequest } from './http/requests';
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
 * Results
 */
app.get('/results', async (req: Request, res: Response) => {
  const response = await resultService.index();

  res.json(response);
});

app.get('/results/:id', async (req: Request, res: Response) => {
  const response = await resultService.show(req.params.id);

  if (!response) {
    return res.status(404).json({
      message: 'Result not found',
    });
  }

  res.json(response);
});

/**
 * Executions
 */
app.get('/executions', async (req: Request, res: Response) => {
  const response = await executionService.index();

  res.json(response);
});

app.post(
  '/executions',
  withRequestValidator(storeExecutionRequest),
  async (req: Request, res: Response) => {
    const dataset = await datasetService.show(req.body.dataset_id);

    if (!dataset) {
      return res.status(404).json({
        message: 'Dataset not found',
      });
    }
    try {
      const response = await executionService.store(req.body);

      res.json(response);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  },
);

app.listen(process.env.EXPRESS_SERVER_PORT, () => {
  console.log(
    `⚡️[server]: Server is running at http://localhost:${process.env.EXPRESS_SERVER_PORT}`,
  );
});


