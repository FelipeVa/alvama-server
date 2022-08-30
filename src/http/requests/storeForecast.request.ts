import { body } from 'express-validator';

export const storeForecastRequest = [
  body('name').notEmpty().withMessage('Name is required'),
  body(['items']).notEmpty().withMessage('Items is required'),
  body(['items']).isArray(),
  body(['items.*.name', 'items.*.value']).notEmpty(),
];
