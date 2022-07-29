import { prisma } from '../utils/prisma';
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

  const show = async (id: string) => {
    return await prisma.forecast.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        items: true,
      },
    });
  };

  const showForAlvama = async (id: string) => {
    return await prisma.forecast.findUnique({
      where: {
        id: parseInt(id),
      },

      select: {
        items: {
          select: {
            name: true,
            value: true,
          },
        },
      },
    });
  };

  const destroy = async (id: string) => {
    return await prisma.forecast.delete({
      where: {
        id: parseInt(id),
      },
    });
  };

  return { index, store, show, showForAlvama, destroy };
};

export const forecastService = service();
