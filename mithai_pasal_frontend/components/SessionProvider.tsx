import { auth } from "@/auth";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import SessionChecker from "./SessionChecker";
import { AUTH_CONFIG } from "@/config/auth";

export default async function NextAuthSessionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider
      refetchOnWindowFocus={false}
      session={session}
      refetchInterval={AUTH_CONFIG.sessionRefreshInterval}
    >
      <SessionChecker /> {children}
    </SessionProvider>
  );
}
