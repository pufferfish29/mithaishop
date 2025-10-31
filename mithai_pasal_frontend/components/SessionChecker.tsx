"use client";

import { logoutUser } from "@/apicalls/auth/action";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const SessionChecker = () => {
  const { data: session, update } = useSession();
  const [expired, setExpired] = useState(false);

  const handleLogout = async () => {
    const data = await logoutUser();
    if (data) {
      window.location.reload();
    }
  };

  useEffect(() => {
    if (expired) {
      handleLogout();
    }
    if (session?.error === "RefreshAccessTokenError") {
      setExpired(true);
      return;
    }

    const timeUntilExpiry =
      new Date(session?.expires ?? "").getTime() - Date.now();
  }, [session, expired]);

  return null;
};

export default SessionChecker;
