import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { createContext, ReactNode, useContext } from "react";
import { auth } from "../firebase";
import { logInWithOauth } from "../services/userServices";
import { ILocalParams, UserData, UserProviderParams } from "../types/userTypes";

const UserContext = createContext({} as UserProviderParams);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();

    return signInWithPopup(auth, provider);
  };

  const oAuthSignIn = async () => {
    try {
      const data = await googleSignIn();

      const { displayName: name, email } = data.user;

      if (name && email) {
        const userInfo = await logInWithOauth({ name, email });
        localStorage.setItem("userData", JSON.stringify(userInfo));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setLocalStorage = (data: ILocalParams) => {
    localStorage.setItem(data.string, JSON.stringify(data.data));
  };

  const userData = (): UserData => {
    return JSON.parse(localStorage.getItem("userData") as string);
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const providerValues = {
    userData,
    oAuthSignIn,
    setLocalStorage,
  };

  return (
    <UserContext.Provider value={providerValues as UserProviderParams}>
      {children}
    </UserContext.Provider>
  );
}

export const UserAuth = () => {
  return useContext(UserContext);
};
