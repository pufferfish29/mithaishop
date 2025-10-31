import type { NextAuthConfig } from "next-auth";
import type { Session } from "next-auth";
import { jwtDecode } from "jwt-decode";
import { AUTH_CONFIG } from "./config/auth";
import { API_URL } from "./config/constant";

export async function refreshToken(token: any) {
  try {
    const res = await fetch(`${API_URL}/`, {
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
      accessToken: data.accessToken || data.access,
      accessTokenExpires:
        (decodedAccess?.exp ?? Math.floor(Date.now() / 1000) + 3600) * 1000, // fallback 1 hour
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
    signIn: "/auth/token/",
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.accessTokenExpires = user.accessTokenExpires;
        token.refreshToken = user.refreshToken;
        token.email = user.email;
        token.username = user.username;
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
      };
      session.accessToken = token.accessToken;
      session.refreshToken = token.accessToken;
      session.error = token.error;
      session.expires = new Date(token.accessTokenExpires).toISOString();

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRECT || "a14ae118886929bcb27dd92b35d2efcd",
  providers: [],
} satisfies NextAuthConfig;
