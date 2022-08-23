import { body } from 'express-validator';

export const loginRequest = [
  body('email').notEmpty().withMessage('Name is required'),
  body('password').notEmpty().withMessage('Password is required'),
];
