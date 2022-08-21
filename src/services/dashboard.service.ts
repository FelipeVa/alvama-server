import { prisma } from '../utils/prisma';

const service = () => {
  const showLastTenResults = async () => {
    const datasetResults = await prisma.datasetResult.findMany({
      orderBy: {
        created_at: 'desc',
      },
      take: 10,
      include: {
        dataset: {
          select: {
            id: true,
            name: true,
          },
        },
        execution: {
          select: {
            id: true,
            name: true,
            created_at: true,
          },
        },
      },
    });

    const forecastResults = await prisma.forecastResult.findMany({
      orderBy: {
        created_at: 'desc',
      },
      include: {
        forecast: {
          select: {
            id: true,
            name: true,
          },
        },
        execution: {
          select: {
            name: true,
          },
        },
        result_items: {
          where: {
            selected: true,
          },
        },
      },

      take: 10,
    });

    return {
      dataset_results: datasetResults,
      forecast_results: forecastResults,
    };
  };

  const showDatasetResultStat = async (datasetResultId: string) => {
    const datasetResult = await prisma.datasetResult.findUnique({
      where: {
        id: parseInt(datasetResultId),
      },

      include: {
        execution: {
          select: {
            id: true,
            name: true,
          },
        },
        dataset: {
          include: {
            routes: true,
            buses: {
              include: {
                capacities: true,
              },
            },
          },
        },
        result_items: true,
      },
    });

    const dataset = datasetResult.dataset;
    const result_items = datasetResult.result_items;

    const datasetAmountOfBuses = dataset.buses
      .map(bus => bus.capacities)
      .flat()
      .reduce((acc, curr) => acc + curr.available, 0);

    const resultBusesToBeUsed = result_items.reduce(
      (acc, curr) => acc + parseInt(curr.value),
      0,
    );

    const totalDemandOfRoutes = dataset.routes.reduce(
      (acc, curr) => acc + curr.demand,
      0,
    );

    return {
      result_id: datasetResult.id,
      status: datasetResult.status,
      name: datasetResult.execution.name,
      objective: datasetResult.objective,
      amount_of_buses: datasetAmountOfBuses,
      buses_to_be_used: resultBusesToBeUsed,
      demand_of_routes: totalDemandOfRoutes,
    };
  };

  return { showDatasetResultStat, showLastTenResults };
};

export const dashboardService = service();
