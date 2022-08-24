import { NextFunction, Request, Response } from 'express';
import { User } from '../../classes/user.class';

const createError = require('http-errors');

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.headers.authorization) {
      return next(new createError.Unauthorized('Unauthorized'));
    }

    const token = req.headers.authorization.split(' ')[1];
    const user = await User.fromJwt(token);

    await user.verifyAccessToken(token);

    delete user.password;

    // eslint-disable-next-line require-atomic-updates
    req.auth = {
      user,
    };

    next();
  } catch (error) {
    next(new createError.Unauthorized('Unauthorized'));
  }
};
