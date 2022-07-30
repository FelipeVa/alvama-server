import { Request, Response } from 'express';
import { datasetExecutionService, datasetService } from '../../services';

export const datasetExecutionController = {
  index: async (req: Request, res: Response) => {
    const response = await datasetExecutionService.index();

    res.json(response);
  },

  store: async (req: Request, res: Response) => {
    const dataset = await datasetService.show(req.body.dataset_id);

    if (!dataset) {
      return res.status(404).json({
        message: 'Dataset not found',
      });
    }
    try {
      const response = await datasetExecutionService.store(req.body);

      res.json(response);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  },
};
