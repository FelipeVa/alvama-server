import {
  Dataset,
  DatasetBus,
  DatasetBusCapacity,
  DatasetRoute,
} from '@prisma/client';

export type BusType = DatasetBus & {
  capacities: DatasetBusCapacity[];
};

export type RouteType = DatasetRoute;

export type DatasetType = Dataset & {
  buses: BusType[];
  routes: DatasetRoute[];
};
