export type AlvamaType = {
  status: string;
  objective: number;
  time: number;
  results: {
    amount: string;
    bus_id: string;
    route_id: string;
    capacity_id: string;
  }[];
};
