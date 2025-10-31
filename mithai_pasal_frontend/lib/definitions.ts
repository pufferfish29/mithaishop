export type User = {
  id: string;
  username: string;
  email: string;
  role: string;
  slug: string;
};

export type LoginResponseData = {
  user: User;
  refresh: string;
  access: string;
};

export type RefreshResponseData = {
  access: string;
};
