export type User = {
  id: string;
  username: string;
  email: string;
};

export type LoginResponseData = {
  user: User;
  refreshToken: string;
  accessToken: string;
};

export type RefreshResponseData = {
  access: string;
};
