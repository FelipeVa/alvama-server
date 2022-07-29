import { prisma } from '../utils/prisma';
import { AlvamaType } from '../types/alvama.type';

const service = () => {
  const index = async () => {
    return await prisma.datasetResult.findMany({
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
    return await prisma.datasetResult.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        execution: true,
        dataset: {
          include: {
            buses: true,
          },
        },
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
    return await prisma.datasetResult.create({
      data: {
        dataset_id: parseInt(datasetId),
        objective: results.objective,
        time: results.time,
        status: results.status,
        result_items: {
          create: results.results.map(result_item => ({
            value: String(result_item.amount),
            bus_id: parseInt(result_item.bus_id),
            route_id: parseInt(result_item.route_id),
            bus_capacity_id: parseInt(result_item.capacity_id),
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

export const datasetResultService = service();
