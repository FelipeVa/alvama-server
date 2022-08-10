import { Request, Response } from 'express';
import { dashboardService } from '../../services';

export const dashboardController = {
  showLastTenResults: async (req: Request, res: Response) => {
    const response = await dashboardService.showLastTenResults();

    res.json(response);
  },

  showDatasetResultStat: async (req: Request, res: Response) => {
    const response = await dashboardService.showDatasetResultStat(
      req.params.id,
    );

    if (!response) {
      return res.status(404).json({
        message: 'Dataset result not found',
      });
    }

    res.json(response);
  },
};