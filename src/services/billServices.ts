import { createAuthHeader } from "../helpers/createAuthHeader";
import { CategoryType, ShortBill } from "../types/billTypes";
import api from "./api";

export async function getShortBills(): Promise<ShortBill[]> {
  const config = createAuthHeader();

  const response = await api.get("/bill", config);

  return response.data as ShortBill[];
}

export async function getBillsCategories(): Promise<CategoryType[]> {
  const config = createAuthHeader();

  const response = await api.get("/bill/category/find", config);

  return response.data as CategoryType[];
}
