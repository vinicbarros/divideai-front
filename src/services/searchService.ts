import api from "./api";
import { createAuthHeader } from "../helpers/createAuthHeader";
import { SearchType } from "../types/searchTypes";

export async function searchFriendList(email: string): Promise<SearchType[]> {
  const config = createAuthHeader();

  const response = await api.get(`/search/friends/${email}`, config);

  return response.data as SearchType[];
}
