import { NextFunction, Request, Response } from 'express';
import { User } from '../../classes/user.class';

const createError = require('http-errors');

export const guestMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (token) {
      const user = await User.fromJwt(token);

      await user.verifyAccessToken(token);

      return next(new createError.Unauthorized('Already logged in'));
    }

    next();
  } catch (error) {
    next();
  }
};
