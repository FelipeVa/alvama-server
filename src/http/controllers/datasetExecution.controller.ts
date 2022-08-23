import { NextFunction, Request, Response } from 'express';
import { datasetExecutionService, datasetService } from '../../services';
const createError = require('http-errors');

export const datasetExecutionController = {
  index: async (req: Request, res: Response) => {
    const response = await datasetExecutionService.index(req.auth.user.id);

    res.json(response);
  },

  store: async (req: Request, res: Response, next: NextFunction) => {
    const dataset = await datasetService.show(
      req.body.dataset_id,
      req.auth.user.id,
    );

    if (!dataset) {
      return next(new createError.NotFound('Dataset not found'));
    }

    try {
      const response = await datasetExecutionService.store(req.body);

      res.json(response);
    } catch (error) {
      next(
        new createError.InternalServerError(
          'Something went wrong while executing the dataset',
        ),
      );
    }
  },
};
