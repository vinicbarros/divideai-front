import { createAuthHeader } from "../helpers/createAuthHeader";
import { ShortBill } from "../types/billTypes";
import api from "./api";

export async function getShortBills(): Promise<ShortBill[]> {
  const config = createAuthHeader();

  const response = await api.get("/bill", config);

  return response.data as ShortBill[];
}
