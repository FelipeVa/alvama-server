import { Request, Response } from 'express';
import { forecastResultService } from '../../services';

export const forecastResultController = {
  index: async (req: Request, res: Response) => {
    const response = await forecastResultService.index();

    res.json(response);
  },

  show: async (req: Request, res: Response) => {
    const response = await forecastResultService.show(req.params.id);

    if (!response) {
      return res.status(404).json({
        message: 'Result not found',
      });
    }

    res.json(response);
  },
};
