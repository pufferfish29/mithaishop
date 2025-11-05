import axiosInstance from "@/lib/axios/interceptor";
import { baseUrl } from "@/lib/baseUrl";
import { UserAddFormInterface } from "@/types/User";
import { useSession } from "next-auth/react";

export async function addUser(data: UserAddFormInterface) {
  const { data: session } = useSession();
  const acccess = session?.accessToken;

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

    // const response = await axiosInstance.post(
    //   `${baseUrl}/auth/signup`,
    //   { data },
    //   { withCredentials: true }
    // );
    // const val = await response.data;

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
