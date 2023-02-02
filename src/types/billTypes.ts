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

export interface ICreateBill {
  name: string;
  value: number;
  categoryId: number;
  billStatus: string;
  expireDate: Date;
  usersBill: {
    userId: number;
    name: string;
    value: number;
  }[];
}

export type UsersBill = {
  name: string;
  userId: number;
  value: number;
};

export type BillType = {
  name: string;
  value: number;
  ownerId: number;
  expireDate: Date;
  billStatus: string;
  category: {
    name: string;
  };
  userBill: {
    value: number;
    users: {
      name: string;
      id: number;
    };
    paymentStatus: string;
  }[];
  id: number;
};
