import { NextFunction, Request, Response } from 'express';

const createError = require('http-errors');
import { jwt } from '../../utils/jwt';

export const guestMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (token) {
      const payload = await jwt.verifyToken(token);

      if (payload) {
        return next(new createError.Unauthorized('Already logged in'));
      }
    }

    next();
  } catch (error) {
    next();
  }
};
