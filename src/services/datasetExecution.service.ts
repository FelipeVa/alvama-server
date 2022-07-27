import { prisma } from '../utils/prisma';
import { datasetResultService } from './datasetResult.service';
import { alvamaService } from './alvama.service';
import { CreateExecutionType } from '../types/execution.type';

const service = () => {
  const index = async () => {
    return await prisma.datasetExecution.findMany({
      orderBy: {
        created_at: 'desc',
      },
      include: {
        dataset: true,
        result: true,
      },
    });
  };

  const store = async ({ dataset_id, name }: CreateExecutionType) => {
    const alvama = await alvamaService.store(dataset_id);
    const result = await datasetResultService.store(dataset_id, alvama);

    return await prisma.datasetExecution.create({
      data: {
        name,
        dataset_id: parseInt(dataset_id),
        result_id: result.id,
      },
    });
  };

  return { store, index };
};

export const datasetExecutionService = service();
