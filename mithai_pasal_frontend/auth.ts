import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
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

    if (!res.ok) {
      throw new Error("Invalid email or password");
    }

    const data = await res.json();
    // console.log("Backend Data: ", data);
    return data;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Something went wrong during login";
    console.error("Login error:", errorMessage);
    throw new Error(errorMessage);
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

        if (!parsedCredentials.success) throw new Error("Invalid Credentials");

        const { email, password } = parsedCredentials.data;

        const res = await loginWithEmailAndPassword(email, password);
        // console.log("Response: ", res);
        if (!res) throw new Error("Invalid Credentials");

        const decodedAccess = jwtDecode(res.accessToken);
        const userData = {
          ...res,
          accessToken: res?.accessToken,
          refreshToken: res?.refreshToken,
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
