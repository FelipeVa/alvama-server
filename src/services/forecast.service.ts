import { prisma } from '../utils/prisma';

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

  return { index };
};

export const forecastService = service();
