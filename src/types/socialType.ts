export type FriendList = {
  id: number;
  friendRequestId: number;
  name: string;
  email: string;
};

export type SendedFriendRequest = {
  users_friendship_friendIdTousers: {
    id: number;
    name: string;
    email: string;
  };
  id: number;
};

export type FriendRequest = {
  users_friendship_userIdTousers: {
    id: number;
    name: string;
    email: string;
  };
  id: number;
};

export interface IFriendResponse {
  friendRequestId: number;
  requestStatus: string;
}
