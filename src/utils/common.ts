import { spawn } from 'child_process';
import { NextFunction, Request, Response } from 'express';
import { ValidationChain, validationResult } from 'express-validator';

export const runCommand = <T>(command: string, args: string[]): Promise<T> =>
  new Promise((resolve, reject) => {
    const py = spawn(command, args);

    py.stderr.on('data', (data: string) => {
      reject(data);
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

  return res.status(422).json({
    errors: extractedErrors,
  });
};

export const withRequestValidator = (validator: ValidationChain[]) => [
  ...validator,
  validateRequestMiddleware,
];
