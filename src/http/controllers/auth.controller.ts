import { NextFunction, Request, Response } from 'express';
import { authService } from '../../services';

const createError = require('http-errors');

export const authController = {
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await authService.login({
        email: req.body.email,
        password: req.body.password,
      });

      res.json({
        access_token: response.accessToken,
      });
    } catch (error) {
      next(createError(error.statusCode, error.message));
    }
  },
};
