"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
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

  return <div>Home Page</div>;
};

export default page;
