import { body } from 'express-validator';

export const storeDatasetRequest = [
  body('name').notEmpty().withMessage('Name is required'),
  body(['routes', 'buses'])
    .notEmpty()
    .withMessage('Routes and buses is required'),
  body(['routes', 'routes', 'buses.*.capacities']).isArray(),
  body([
    'buses.*.name',
    'buses.*.capacities',
    'buses.*.capacities.*.name',
    'buses.*.capacities.*.capacity',
    'buses.*.capacities.*.available',
    'buses.*.cost_per_km',
    'routes.*.name',
    'routes.*.length',
    'routes.*.demand',
    'routes.*.cycle_time',
  ]).notEmpty(),
];
