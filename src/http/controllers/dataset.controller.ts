import { NextFunction, Request, Response } from 'express';
import { datasetService } from '../../services';
const createError = require('http-errors');

export const datasetController = {
  index: async (req: Request, res: Response) => {
    const response = await datasetService.index(req.auth.user.id);

    res.json(response);
  },

  store: async (req: Request, res: Response) => {
    const response = await datasetService.store(req.body, req.auth.user.id);

    res.json(response);
  },

  show: async (req: Request, res: Response, next: NextFunction) => {
    const response = await datasetService.show(req.params.id, req.auth.user.id);

    if (!response) {
      return next(new createError.NotFound('Dataset not found'));
    }

    res.json(response);
  },

  destroy: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await datasetService.destroy(req.params.id, req.auth.user.id);

      res.json({
        status: 201,
        message: 'Dataset deleted',
      });
    } catch (error) {
      next(new createError.NotFound('Dataset not found'));
    }
  },
};
