export type FriendList = {
  id: number;
  friendRequestId: number;
  name: string;
  email: string;
};

export interface IFriendResponse {
  friendRequestId: number;
  requestStatus: string;
}
