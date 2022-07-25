import { prisma } from '../utils/prisma';
import { DatasetType } from '../types/dataset.type';

const service = () => {
  const index = async () => {
    return await prisma.dataset.findMany({
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

  const store = async (dataset: DatasetType) => {
    return await prisma.dataset.create({
      data: {
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

  const destroy = async (id: string) => {
    return await prisma.dataset.delete({
      where: {
        id: parseInt(id),
      },
    });
  };

  const show = async (id: string) => {
    return await prisma.dataset.findUnique({
      where: {
        id: parseInt(id),
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
