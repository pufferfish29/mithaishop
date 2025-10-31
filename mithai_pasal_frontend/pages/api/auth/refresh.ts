import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import { baseUrl } from "@/lib/baseUrl";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookies = cookie.parse(req.headers.cookie || "");
  const refresh = cookies.refreshToken;

  if (!refresh)
    return res.status(401).json({ message: "No refresh token found" });

  const response = await fetch(`${baseUrl}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  });

  if (!response.ok) return res.status(403).json({ message: "Token expired" });

  const { access } = await response.json();
  res.status(200).json({ access });
}
