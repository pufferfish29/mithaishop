import { DefaultSession } from "next-auth";

import { JWT, Session, User } from "next-auth/next";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    error?: string;
    user: {
      username: string;
      email: string;
    } & DefaultSession["user"];
  }

  interface User {
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
  }

  interface JWT {
    accessToken: string;
    accessTokenExpires: number;
    refreshToken: string;
    email: string;
    username: string;
    error?: string;
  }
}
