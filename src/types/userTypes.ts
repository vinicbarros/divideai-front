export type UserProviderParams = {
  userData: () => UserData;
  oAuthSignIn: () => Promise<void>;
  setLocalStorage: (data: ILocalParams) => Promise<void>;
};

export type UserData = {
  user: {
    id: number;
    name: string;
    email: string;
  };
  token: string;
};

export interface ILocalParams {
  string: string;
  data: any;
}

export type UserBillType = {
  value: number;
  users: {
    name: string;
    id: number;
  };
  paymentStatus: string;
};
