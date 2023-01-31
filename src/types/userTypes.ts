export type UserProviderParams = {
  userData: UserData | null;
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
