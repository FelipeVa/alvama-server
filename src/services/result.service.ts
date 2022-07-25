import { prisma } from '../utils/prisma';
import { AlvamaType } from '../types/alvama.type';

const service = () => {
  const index = async () => {
    return await prisma.result.findMany({
      orderBy: {
        created_at: 'desc',
      },
      include: {
        execution: true,
        result_items: {
          include: {
            bus: true,
            route: true,
            capacity: true,
          },
        },
      },
    });
  };

  const show = async (id: string) => {
    return await prisma.result.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        execution: true,
        dataset: true,
        result_items: {
          include: {
            bus: true,
            route: true,
            capacity: true,
          },
        },
      },
    });
  };

  const store = async (datasetId: string, results: AlvamaType) => {
    return await prisma.result.create({
      data: {
        dataset_id: parseInt(datasetId),
        objective: results.objective,
        time: results.time,
        status: results.status,
        result_items: {
          create: results.results.map(result_item => ({
            value: String(result_item.amount),
            bus_id: parseInt(result_item.bus.id),
            route_id: parseInt(result_item.route.id),
            bus_capacity_id: parseInt(result_item.capacity.id),
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

export const resultService = service();
