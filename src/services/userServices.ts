import { AxiosResponse } from "axios";
import { UserData } from "../types/userTypes";
import api from "./api";

export async function logInWithOauth({
  name,
  email,
}: {
  name: string;
  email: string;
}): Promise<AxiosResponse<UserData, any>> {
  const response = await api.post("/auth/oauth", { name, email });
  return response.data;
}

export async function postSignIn(body: {
  email: string;
  password: string;
}): Promise<AxiosResponse<UserData, any>> {
  const response = await api.post("/auth/sign-in", body);
  return response.data;
}

export async function postSignUp(body: {
  name: string;
  email: string;
  password: string;
}) {
  const response = await api.post("/signup", body);
  return response;
}
