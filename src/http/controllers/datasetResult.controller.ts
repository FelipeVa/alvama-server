import { NextFunction, Request, Response } from 'express';
import { datasetResultService } from '../../services';
import createError from 'http-errors';

export const datasetResultController = {
  index: async (req: Request, res: Response) => {
    const response = await datasetResultService.index(req.auth.user.id);

    res.json(response);
  },

  show: async (req: Request, res: Response, next: NextFunction) => {
    const response = await datasetResultService.show(
      req.params.id,
      req.auth.user.id,
    );

    if (!response) {
      return next(new createError.NotFound('Result not found'));
    }

    res.json(response);
  },
};
