import { runCommand } from '../utils/common';
import { datasetService } from './dataset.service';
import { AlvamaType, ForecastType } from '../types/alvama.type';
import { forecastService } from './forecast.service';

const service = () => {
  const runModel = async (datasetId: string): Promise<AlvamaType> => {
    const dataset = await datasetService.showForAlvama(datasetId);

    return await runCommand(process.env.ALVAMA_BINARY, [
      'alvama',
      `${JSON.stringify(dataset)}`,
    ]);
  };

  const runForecast = async (forecastId: string): Promise<ForecastType> => {
    const forecast = await forecastService.showForAlvama(forecastId);

    return await runCommand(process.env.ALVAMA_BINARY, [
      'forecast',
      `${JSON.stringify(forecast)}`,
    ]);
  };

  return { runModel, runForecast };
};

export const alvamaService = service();
