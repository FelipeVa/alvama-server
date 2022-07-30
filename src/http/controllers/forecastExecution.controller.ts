import { Request, Response } from 'express';
import { forecastExecutionService, forecastService } from '../../services';

export const forecastExecutionController = {
  index: async (req: Request, res: Response) => {
    const response = await forecastExecutionService.index();

    res.json(response);
  },

  store: async (req: Request, res: Response) => {
    const forecast = await forecastService.show(req.body.forecast_id);

    if (!forecast) {
      return res.status(404).json({
        message: 'Forecast not found',
      });
    }
    try {
      const response = await forecastExecutionService.store(req.body);

      res.json(response);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  },
};
