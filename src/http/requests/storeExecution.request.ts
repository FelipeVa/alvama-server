import { body } from 'express-validator';

export const storeExecutionRequest = [
  body('name').notEmpty().withMessage('Name is required'),
  body('dataset_id').notEmpty().withMessage('Dataset is required'),
];
