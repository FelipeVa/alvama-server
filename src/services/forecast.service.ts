import { prisma } from '../utils/prisma';
import { ForecastType } from '../types/forecast.type';

const service = () => {
  const index = async (userId: number) => {
    return await prisma.forecast.findMany({
      where: {
        user_id: userId,
      },
      orderBy: {
        created_at: 'desc',
      },
      include: {
        items: true,
      },
    });
  };

  const store = async (forecast: ForecastType, userId: number) => {
    return await prisma.forecast.create({
      data: {
        user_id: userId,
        name: forecast.name,
        items: {
          create: forecast.items,
        },
      },
      include: {
        items: true,
      },
    });
  };

  const show = async (id: string, userId: number) => {
    return await prisma.forecast.findFirst({
      where: {
        id: parseInt(id),
        user_id: userId,
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

  const destroy = async (id: string, userId: number) => {
    await prisma.forecast.findFirstOrThrow({
      where: {
        id: parseInt(id),
        user_id: userId,
      },
    });

    return await prisma.forecast.deleteMany({
      where: {
        id: parseInt(id),
        user_id: userId,
      },
    });
  };

  return { index, store, show, showForAlvama, destroy };
};

export const forecastService = service();
