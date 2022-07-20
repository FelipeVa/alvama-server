import { DatasetType } from '../types/model.types';
import { prisma } from '../utils/prisma';

const service = () => {
  const store = async (dataset: DatasetType) => {
    return await prisma.dataset.create({
      data: dataset,
    });
  };

  return { store };
};

export const datasetService = service();
