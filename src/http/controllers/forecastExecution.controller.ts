import { NextFunction, Request, Response } from 'express';
import { forecastExecutionService, forecastService } from '../../services';
import createError from 'http-errors';

export const forecastExecutionController = {
  index: async (req: Request, res: Response) => {
    const response = await forecastExecutionService.index(req.auth.user.id);

    res.json(response);
  },

  store: async (req: Request, res: Response, next: NextFunction) => {
    const forecast = await forecastService.show(
      req.body.forecast_id,
      req.auth.user.id,
    );

    if (!forecast) {
      return next(new createError.NotFound('Forecast not found'));
    }

    try {
      const response = await forecastExecutionService.store(req.body);

      res.json(response);
    } catch (error) {
      next(
        new createError.InternalServerError(
          'Something went wrong while executing the forecast',
        ),
      );
    }
  },
};
