import { body } from 'express-validator';

export const storeForecastRequest = [
  body('name').notEmpty().withMessage('Name is required'),
  body('items').isArray({ min: 4 }).withMessage('Items is required'),
  body(['items.*.name', 'items.*.value']).notEmpty(),
];
