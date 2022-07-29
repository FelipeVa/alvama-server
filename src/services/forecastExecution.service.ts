import { prisma } from '../utils/prisma';
import { alvamaService } from './alvama.service';
import { ForecastCreateExecutionType } from '../types/execution.type';
import { forecastResultService } from './forecastResult.service';

const service = () => {
  const index = async () => {
    return await prisma.forecastExecution.findMany({
      orderBy: {
        created_at: 'desc',
      },
      include: {
        forecast: true,
        result: true,
      },
    });
  };

  const store = async ({ forecast_id, name }: ForecastCreateExecutionType) => {
    const alvama = await alvamaService.runForecast(forecast_id);
    const result = await forecastResultService.store(forecast_id, alvama);

    return await prisma.forecastExecution.create({
      data: {
        name,
        forecast_id: parseInt(forecast_id),
        result_id: result.id,
      },
    });
  };

  return { store, index };
};

export const forecastExecutionService = service();
