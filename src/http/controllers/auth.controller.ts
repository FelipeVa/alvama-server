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

  me(req: Request, res: Response) {
    res.json(req.auth.user);
  },

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      await req.auth.user.revokeAccessToken(
        req.headers.authorization.split(' ')[1],
      );

      res.json({
        message: 'Logged out successfully',
      });
    } catch (error) {
      next(new createError.NotFound('Token not found'));
    }
  },
};
