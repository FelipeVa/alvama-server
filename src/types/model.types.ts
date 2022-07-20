export type RouteType = {
  label: string;
  number: number;
  length: number;
  demand: number;
  cycle_time: number;
  fare: number;
};

export type BusCapacityType = {
  capacity: number;
  available: number;
};

export type BusCostType = {
  per_km: number;
};

export type BusType = {
  brand: string;
  capacities: BusCapacityType[];
  costs: BusCostType;
};

export type DatasetType = {
  id: number;
  name: string;
  buses: BusType[];
  routes: RouteType[];
};
