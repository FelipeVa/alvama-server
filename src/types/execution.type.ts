import { Execution, Result } from '@prisma/client';
import { DatasetType } from './dataset.type';

export interface ExecutionType extends Execution {
  dataset: DatasetType;
  result: Result;
}

export interface CreateExecutionType extends Pick<ExecutionType, 'name'> {
  dataset_id: string;
}
