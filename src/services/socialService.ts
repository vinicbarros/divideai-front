import { createAuthHeader } from "../helpers/createAuthHeader";
import {
  FriendList,
  FriendRequest,
  IFriendResponse,
  SendedFriendRequest,
} from "../types/socialType";
import api from "./api";

export async function getFriendsList(): Promise<FriendList[]> {
  const config = createAuthHeader();

  const response = await api.get("/friend", config);

  return response.data as FriendList[];
}

export async function sendFriendRequest(friendId: number) {
  const config = createAuthHeader();

  const response = await api.post("/friend/send", { friendId }, config);

  return response;
}

export async function getSendedFriendRequest(): Promise<SendedFriendRequest[]> {
  const config = createAuthHeader();

  const response = await api.get("/friend/send", config);

  return response.data as SendedFriendRequest[];
}

export async function getFriendRequest(): Promise<FriendRequest[]> {
  const config = createAuthHeader();

  const response = await api.get("/friend/request", config);

  return response.data as FriendRequest[];
}

export async function acceptRejectFriend(body: IFriendResponse) {
  const config = createAuthHeader();

  const response = await api.put("/friend/send", body, config);

  return response;
}

export async function deleteFriendRequest(friendRequestId: number) {
  const config = createAuthHeader();

  const response = await api.delete(
    `/friend/delete/${friendRequestId}`,
    config
  );

  return response;
}
