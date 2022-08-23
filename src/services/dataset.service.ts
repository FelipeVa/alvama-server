import { prisma } from '../utils/prisma';
import { DatasetType } from '../types/dataset.type';

const service = () => {
  const index = async (userId: number) => {
    return await prisma.dataset.findMany({
      where: {
        user_id: userId,
      },
      orderBy: {
        created_at: 'desc',
      },
      include: {
        routes: true,
        buses: {
          include: {
            capacities: true,
          },
        },
      },
    });
  };

  const store = async (dataset: DatasetType, userId: number) => {
    return await prisma.dataset.create({
      data: {
        user_id: userId,
        name: dataset.name,
        routes: {
          create: dataset.routes,
        },
        buses: {
          create: dataset.buses.map(bus => ({
            ...bus,
            capacities: {
              create: bus.capacities,
            },
          })),
        },
      },
      include: {
        routes: true,
        buses: {
          include: {
            capacities: true,
          },
        },
      },
    });
  };

  const destroy = async (id: string, userId: number) => {
    await prisma.dataset.findFirstOrThrow({
      where: {
        id: parseInt(id),
        user_id: userId,
      },
    });

    return await prisma.dataset.deleteMany({
      where: {
        id: parseInt(id),
        user_id: userId,
      },
    });
  };

  const show = async (id: string, userId: number) => {
    return await prisma.dataset.findFirst({
      where: {
        id: parseInt(id),
        user_id: userId,
      },
      include: {
        routes: true,
        buses: {
          include: {
            capacities: true,
          },
        },
      },
    });
  };

  const showForAlvama = async (id: string) => {
    return await prisma.dataset.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        routes: {
          select: {
            id: true,
            length: true,
            cycle_time: true,
            demand: true,
          },
        },
        buses: {
          select: {
            id: true,
            cost_per_km: true,
            capacities: {
              select: {
                id: true,
                available: true,
                capacity: true,
              },
            },
          },
        },
      },
    });
  };

  return { index, store, destroy, show, showForAlvama };
};

export const datasetService = service();
