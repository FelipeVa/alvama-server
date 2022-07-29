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

export type ForecastType = {
  method: string;
  mean_squared_error: number;
  next_period_forecast: number;
  values: number[];
  time: number;
};
