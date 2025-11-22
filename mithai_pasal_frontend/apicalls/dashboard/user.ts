"use server";

import { baseUrl } from "@/lib/baseUrl";
import { UserAddFormInterface } from "@/types/User";

export async function addUser(data: UserAddFormInterface, acccess: string) {
  if (!acccess) {
    throw new Error("Unauthorized");
  }

  try {
    const response = await fetch(`${baseUrl}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${acccess}`,
      },
      body: JSON.stringify(data),
    });

    console.log(response);
    const val = await response.json();

    if (response.ok) {
      return {
        status: response.status,
        value: val,
      };
    }

    return {
      status: response.status,
      value: val,
    };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    console.log(errorMessage);
  }
}
