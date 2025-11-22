"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (
      session === null ||
      session.accessToken === null ||
      session.refreshToken === null
    ) {
      router.push("/login");
    }
  }, [session]);
  return <main>Mithai Pasal</main>;
}
