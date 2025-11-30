"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useEffect } from "react";
import LoginPage from "./(auth)/login/page";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (
      session === null ||
      session.accessToken === null ||
      session.refreshToken === null
    ) {
      router.push("/");
    }
  }, [session]);
  return (
    <main>
      <LoginPage />
    </main>
  );
}
