export type ShortBill = {
  bill: {
    name: string;
    createdAt: Date;
    id: number;
    value: number;
    category: {
      name: string;
    };
    _count: {
      userBill: number;
    };
  };
};
