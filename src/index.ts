import express, { Express, NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { datasetService, alvamaService } from './services';
import { storeDatasetRequest } from './http/requests/storeDataset.request';

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
app.use(express.urlencoded({ extended: false }));

function validate(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors: Record<string, string>[] = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
}

/**
 * Services
 */
/**
 * App routes
 */
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.post('/alvama', async (req: Request, res: Response) => {
  const response = await alvamaService.store(req.body);

  res.json(response);
});

app.post(
  '/datasets',
  storeDatasetRequest,
  validate,
  async (req: Request, res: Response) => {
    const response = await datasetService.store(req.body);

    res.json(response);
  },
);

app.listen(process.env.EXPRESS_SERVER_PORT, () => {
  console.log(
    `⚡️[server]: Server is running at http://localhost:${process.env.EXPRESS_SERVER_PORT}`,
  );
});
