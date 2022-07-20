import { body } from 'express-validator';

export const storeDatasetRequest = [
  body('name').notEmpty().withMessage('Name is required'),
  body(['routes', 'buses']).notEmpty(),
  body(['routes', 'routes', 'buses.*.capacities']).isArray(),
  body([
    'buses.*.capacities.*.capacity',
    'buses.*.capacities.*.available',
  ]).notEmpty(),
  body(['buses.*.brand', 'buses.*.capacities', 'buses.*.costs']).notEmpty(),
  body([
    'routes.*.label',
    'routes.*.number',
    'routes.*.length',
    'routes.*.demand',
    'routes.*.cycle_time',
    'routes.*.fare',
  ]).notEmpty(),
];
