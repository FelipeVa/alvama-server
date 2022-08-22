import { NextFunction, Request, Response } from 'express';
import { dashboardService } from '../../services';
const createError = require('http-errors');

export const dashboardController = {
  showLastTenResults: async (req: Request, res: Response) => {
    const response = await dashboardService.showLastTenResults(
      req.auth.user.id,
    );

    res.json(response);
  },

  showDatasetResultStat: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const response = await dashboardService.showDatasetResultStat(
        req.params.id,
        req.auth.user.id,
      );

      res.json(response);
    } catch (error) {
      next(new createError.NotFound('Dataset not found'));
    }
  },
};
