import { prisma } from '../utils/prisma';
import { ForecastType } from '../types/alvama.type';

const service = () => {
  const index = async () => {
    return await prisma.forecastResult.findMany({
      orderBy: {
        created_at: 'desc',
      },
      include: {
        execution: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  };

  const show = async (id: string) => {
    return await prisma.forecastResult.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        execution: true,
        forecast: {
          include: {
            items: true,
          },
        },
      },
    });
  };

  const store = async (forecast_id: string, results: ForecastType) => {
    return await prisma.forecastResult.create({
      data: {
        forecast_id: parseInt(forecast_id),
        method: results.method,
        time: results.time,
        value: results.next_period_forecast,
        mean_squared_error: results.mean_squared_error,
      },
    });
  };

  return { store, index, show };
};

export const forecastResultService = service();
