"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "./loading";

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
    } else {
      router.push("/login");
    }
  }, [session, status]);

  if (status === "authenticated") {
    return <>{children}</>;
  }

  return (
    <>
      <Loading />
    </>
  );
}
