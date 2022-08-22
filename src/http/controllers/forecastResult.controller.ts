import { NextFunction, Request, Response } from 'express';
import { forecastResultService } from '../../services';
import createError from 'http-errors';

export const forecastResultController = {
  index: async (req: Request, res: Response) => {
    const response = await forecastResultService.index(req.auth.user.id);

    res.json(response);
  },

  show: async (req: Request, res: Response, next: NextFunction) => {
    const response = await forecastResultService.show(
      req.params.id,
      req.auth.user.id,
    );

    if (!response) {
      return next(new createError.NotFound('Result not found'));
    }

    res.json(response);
  },
};
