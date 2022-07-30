import { Request, Response } from 'express';
import { forecastService } from '../../services';

export const forecastController = {
  index: async (req: Request, res: Response) => {
    const response = await forecastService.index();

    res.json(response);
  },

  store: async (req: Request, res: Response) => {
    const response = await forecastService.store(req.body);

    res.json(response);
  },

  show: async (req: Request, res: Response) => {
    const response = await forecastService.show(req.params.id);

    if (!response) {
      return res.status(404).json({
        message: 'Forecast not found',
      });
    }

    res.json(response);
  },

  destroy: async (req: Request, res: Response) => {
    const response = await forecastService.destroy(req.params.id);

    if (!response) {
      return res.status(404).json({
        message: 'Forecast not found',
      });
    }

    res.json(response);
  },
};
