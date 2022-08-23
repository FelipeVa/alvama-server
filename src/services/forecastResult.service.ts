import { prisma } from '../utils/prisma';
import { ForecastType } from '../types/alvama.type';

const service = () => {
  const index = async (userId: number) => {
    return await prisma.forecastResult.findMany({
      where: {
        forecast: {
          user_id: userId,
        },
      },
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
        result_items: {
          select: {
            method: true,
            value: true,
            selected: true,
          },
        },
      },
    });
  };

  const show = async (id: string, userId: number) => {
    return await prisma.forecastResult.findFirst({
      where: {
        id: parseInt(id),
        forecast: {
          user_id: userId,
        },
      },
      include: {
        execution: true,
        result_items: true,
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
        time: results.time,
        result_items: {
          create: results.forecasts.map(result_item => ({
            method: result_item.method,
            value: result_item.next_period_forecast,
            mean_squared_error: result_item.mean_squared_error,
            selected: result_item.selected,
          })),
        },
      },
      include: {
        result_items: true,
      },
    });
  };

  return { store, index, show };
};

export const forecastResultService = service();
