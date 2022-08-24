import { spawn } from 'child_process';
import express, { NextFunction, Request, Response } from 'express';
import { ValidationChain, validationResult } from 'express-validator';
import { Model } from '../classes/model.class';
const createError = require('http-errors');

export const runCommand = <T>(command: string, args: string[]): Promise<T> =>
  new Promise((resolve, reject) => {
    const py = spawn(command, args);

    py.stderr.on('data', (data: string) => {
      reject(data.toString());
    });

    py.stdout.on('data', (data: string) => {
      resolve(JSON.parse(data.toString()));
    });
  });

export const validateRequestMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors: Record<string, string>[] = [];

  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return next(
    new createError.UnprocessableEntity({
      description: 'Validation errors',
      errors: extractedErrors,
    }),
  );
};

export const withRequestValidatorMiddleware = (
  validator: ValidationChain[],
) => [...validator, validateRequestMiddleware];

export const asyncHandler =
  (
    fn: (
      req: Request,
      res: Response,
      next: NextFunction,
    ) => Promise<express.Response | void>,
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };
