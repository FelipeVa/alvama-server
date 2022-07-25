export type AlvamaType = {
  status: string;
  objective: number;
  time: number;
  results: {
    amount: string;
    bus: {
      id: string;
    };
    route: {
      id: string;
    };
    capacity: {
      id: string;
    };
  }[];
};
