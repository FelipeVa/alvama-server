import { Forecast, ForecastItem } from '@prisma/client';

export type ForecastType = Forecast & {
  items: ForecastItem[];
};
