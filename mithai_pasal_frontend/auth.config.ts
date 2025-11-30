import type { NextAuthConfig } from "next-auth";
import type { Session } from "next-auth";
import { jwtDecode } from "jwt-decode";
import { AUTH_CONFIG } from "./config/auth";
import { baseUrl } from "./lib/baseUrl";

export async function refreshToken(token: any) {
  try {
    const res = await fetch(`${baseUrl}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: token.refreshToken }),
    });

    if (!res.ok) {
      throw new Error("Failed to refresh token");
    }

    const data = await res.json();

    const decodedAccess: any = jwtDecode(data.access);

    // console.log("Token refreshed");

    return {
      ...token,
      accessToken: data.access || data.accessToken,
      accessTokenExpires: decodedAccess.exp * 1000,
      refreshToken: data.refresh || token.refreshToken, // optional: use new refresh token if provided
    };
  } catch (error) {
    console.error("Error refreshing token:", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authConfig = {
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.accessTokenExpires = user.accessTokenExpires;
        token.refreshToken = user.refreshToken;
        token.email = user.email;
        token.role = user.role;
        token.username = user.username;
        console.log("User: ", user);
        return token;
      }

      if (Date.now() < token.accessTokenExpires - AUTH_CONFIG.refreshBuffer) {
        return {
          ...token,
          accessToken: token?.access ?? token.accessToken,
          refreshToken: token?.refresh ?? token.refreshToken,
        };
      }
      return refreshToken(token);
    },

    async session({ session, token }: { session: Session; token: any }) {
      session.user = {
        ...session.user,
        username: token.username,
        email: token.email,
        role: token.role,
      };
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.error = token.error;
      session.expires = new Date(token.accessTokenExpires).toISOString();
      // console.log("Session: ", session);
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret:
    process.env.AUTH_SECRECT ||
    "GLdhybW/kXIprBU3Y/zCuzvB56wqwhlM4TKwnHvS2xZKPfLjFTJ3EkKNAkY=",
  providers: [],
} satisfies NextAuthConfig;
