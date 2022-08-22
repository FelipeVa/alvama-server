import { NextFunction, Request, Response } from 'express';
import { forecastService } from '../../services';
import createError from 'http-errors';

export const forecastController = {
  index: async (req: Request, res: Response) => {
    const response = await forecastService.index(req.auth.user.id);

    res.json(response);
  },

  store: async (req: Request, res: Response) => {
    const response = await forecastService.store(req.body, req.auth.user.id);

    res.json(response);
  },

  show: async (req: Request, res: Response, next: NextFunction) => {
    const response = await forecastService.show(
      req.params.id,
      req.auth.user.id,
    );

    if (!response) {
      return next(new createError.NotFound('Forecast not found'));
    }

    res.json(response);
  },

  destroy: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await forecastService.destroy(req.params.id, req.auth.user.id);

      res.json({
        status: 201,
        message: 'Forecast deleted',
      });
    } catch (error) {
      next(new createError.NotFound('Forecast not found'));
    }
  },
};
