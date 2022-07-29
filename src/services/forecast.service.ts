import { prisma } from '../utils/prisma';
import { DatasetType } from '../types/dataset.type';
import { ForecastType } from '../types/forecast.type';

const service = () => {
  const index = async () => {
    return await prisma.forecast.findMany({
      orderBy: {
        created_at: 'desc',
      },
      include: {
        items: true,
      },
    });
  };

  const store = async (dataset: ForecastType) => {
    return await prisma.forecast.create({
      data: {
        name: dataset.name,
        items: {
          create: dataset.items,
        },
      },
      include: {
        items: true,
      },
    });
  };

  return { index, store };
};

export const forecastService = service();
