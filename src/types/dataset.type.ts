import { Dataset, Bus, BusCapacity, Route } from '@prisma/client';

export type BusType = Bus & {
  capacities: BusCapacity[];
};

export type RouteType = Route;

export type DatasetType = Dataset & {
  buses: BusType[];
  routes: Route[];
};
