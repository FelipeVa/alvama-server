import { body } from 'express-validator';

export const storeForecastExecutionRequest = [
  body('name').notEmpty().withMessage('Name is required'),
  body('forecast_id').notEmpty().withMessage('Forecast is required'),
];
