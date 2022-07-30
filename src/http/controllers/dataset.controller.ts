import { Request, Response } from 'express';
import { datasetService } from '../../services';

export const datasetController = {
  index: async (req: Request, res: Response) => {
    const response = await datasetService.index();

    res.json(response);
  },

  store: async (req: Request, res: Response) => {
    const response = await datasetService.store(req.body);

    res.json(response);
  },

  show: async (req: Request, res: Response) => {
    const response = await datasetService.show(req.params.id);

    if (!response) {
      return res.status(404).json({
        message: 'Dataset not found',
      });
    }

    res.json(response);
  },

  destroy: async (req: Request, res: Response) => {
    const response = await datasetService.destroy(req.params.id);

    if (!response) {
      return res.status(404).json({
        message: 'Dataset not found',
      });
    }

    res.json(response);
  },
};
