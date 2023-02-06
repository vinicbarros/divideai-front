import { createAuthHeader } from "../helpers/createAuthHeader";
import {
  CategoryType,
  BillType,
  ICreateBill,
  ShortBill,
  ResumeType,
} from "../types/billTypes";
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

export async function postNewBill(body: ICreateBill) {
  const config = createAuthHeader();

  const response = await api.post("/bill", body, config);

  return response.data;
}

export async function getBill(billId: number): Promise<BillType> {
  const config = createAuthHeader();

  const response = await api.get(`/bill/${billId}`, config);

  return response.data as BillType;
}

export async function postPaidBill(billId: number) {
  const config = createAuthHeader();

  const response = await api.post(`/bill/${billId}/paid`, {}, config);

  return response;
}

export async function getInfoResume(): Promise<ResumeType> {
  const config = createAuthHeader();

  const response = await api.get("/bill/infos/resume", config);

  return response.data as ResumeType;
}

export async function deleteBill(billId: number) {
  const config = createAuthHeader();

  const response = await api.delete(`/bill/${billId}`, config);

  return response;
}
