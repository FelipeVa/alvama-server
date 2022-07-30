import { Request, Response } from 'express';
import { datasetResultService } from '../../services';

export const datasetResultController = {
  index: async (req: Request, res: Response) => {
    const response = await datasetResultService.index();

    res.json(response);
  },

  show: async (req: Request, res: Response) => {
    const response = await datasetResultService.show(req.params.id);

    if (!response) {
      return res.status(404).json({
        message: 'Result not found',
      });
    }

    res.json(response);
  },
};
