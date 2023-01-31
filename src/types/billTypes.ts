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

export interface IShortBillMapped {
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
}

export type CategoryType = {
  id: number;
  name: string;
};
