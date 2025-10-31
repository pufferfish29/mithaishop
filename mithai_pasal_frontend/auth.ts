import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import type { LoginResponseData } from "./lib/definitions";
import { jwtDecode } from "jwt-decode";
import { AUTH_CONFIG } from "./config/auth";
import { baseUrl } from "./lib/baseUrl";

async function loginWithEmailAndPassword(email: string, password: string) {
  try {
    const res = await fetch(`${baseUrl}/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    console.log(res);
    if (!res.ok) {
      throw new Error("Invalid email or password");
    }

    const data: LoginResponseData = await res.json();
    console.log(data);
    return data as LoginResponseData;
  } catch (error: any) {
    console.error("Login error:", error);
    throw new Error("Something went wrong during login");
  }
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  trustHost: true,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string(), password: z.string().min(6) })
          .safeParse(credentials);
        console.log(credentials);

        if (!parsedCredentials.success) throw new Error("Invalid Credentials");

        const { email, password } = parsedCredentials.data;

        const res = await loginWithEmailAndPassword(email, password);
        if (!res) throw new Error("Invalid Credentials");

        const decodedAccess = jwtDecode(res.access);
        const userData = {
          ...res,
          accessToken: res.access,
          refreshToken: res.refresh,
          email,
          accessTokenExpires:
            (decodedAccess?.exp ??
              Math.floor(Date.now() / 1000) + AUTH_CONFIG.accessTokenExpiry) *
            1000,
        };

        return userData;
      },
    }),
  ],
});
