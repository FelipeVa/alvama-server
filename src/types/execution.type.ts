import { DatasetExecution, DatasetResult } from '@prisma/client';
import { DatasetType } from './dataset.type';

export interface ExecutionType extends DatasetExecution {
  dataset: DatasetType;
  result: DatasetResult;
}

export interface CreateExecutionType extends Pick<ExecutionType, 'name'> {
  dataset_id: string;
}
