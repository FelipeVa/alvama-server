import {
  DatasetExecution,
  DatasetResult,
  ForecastResult,
  ForecastExecution,
} from '@prisma/client';
import { DatasetType } from './dataset.type';
import { ForecastType } from './forecast.type';

export interface DatasetExecutionType extends DatasetExecution {
  dataset: DatasetType;
  result: DatasetResult;
}

export interface DatasetCreateExecutionType
  extends Pick<DatasetExecutionType, 'name'> {
  dataset_id: string;
}

export interface ForecastExecutionType extends ForecastExecution {
  forecast: ForecastType;
  result: ForecastResult;
}

export interface ForecastCreateExecutionType
  extends Pick<ForecastExecutionType, 'name'> {
  forecast_id: string;
}
