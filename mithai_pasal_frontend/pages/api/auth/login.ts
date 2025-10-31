import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import { baseUrl } from "@/lib/baseUrl";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;

  const response = await fetch(`${baseUrl}/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok)
    return res.status(401).json({ message: "Invalid credentials" });

  const { access, refresh } = await response.json();

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("refreshToken", refresh, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
  );

  res.status(200).json({ access });
}
