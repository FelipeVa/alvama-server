import { NextFunction, Request, Response } from 'express';
import { prisma } from '../../utils/prisma';
import { User } from '../../classes/user.class';

const createError = require('http-errors');
import { jwt } from '../../utils/jwt';

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

    const userAccessToken = await prisma.userAccessToken.findFirst({
      where: {
        token,
      },
    });

    if (!userAccessToken) {
      return next(new createError.Unauthorized('Unauthorized'));
    }

    const payload = await jwt.verifyToken(userAccessToken.token);

    if (!payload) {
      return next(new createError.Unauthorized('Unauthorized'));
    }

    delete payload.password;

    // eslint-disable-next-line require-atomic-updates
    req.auth = {
      user: new User(payload),
    };

    next();
  } catch (error) {
    next(new createError.Unauthorized(error.message));
  }
};
