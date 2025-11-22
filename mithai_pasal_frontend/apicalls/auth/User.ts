"use server";

import { auth, signIn, signOut } from "@/auth";
import axiosInstance from "@/lib/axios/interceptor";
import { baseUrl } from "@/lib/baseUrl";
import { LoginInterface } from "@/types/User";
import { AuthError } from "next-auth";

export async function Signup(data: LoginInterface) {
  try {
    const response = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (response && response.error) {
      throw new Error(response.error);
    }

    return response;
  } catch (error: unknown) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong";
      }
    }
    return "An unexpected error occured.";
  }
}

export async function logoutUser() {
  try {
    const data = await signOut();
    return data;
  } catch (error) {
    return "Something went wrong.";
  }
}

export async function getMyDetails() {
  const session = await auth();

  if (!session || !session.accessToken) {
    throw new Error("Unauthorized");
  }

  let accessToken = session.accessToken;

  try {
    const response = await fetch(`${baseUrl}/api/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    return {
      status: response.status,
      data,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred.";
    return {
      status: 500,
      data: { message: errorMessage },
    };
  }
}

export async function sendResetPasswordEmail(email: string) {
  try {
    const response = await axiosInstance.post(
      `${baseUrl}/auth/forgot-password`,
      {
        email,
      },
      { headers: { Authorization: "" } }
    );

    console.log(response);

    const data = await response.data;

    return {
      status: response.status,
      data,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred.";
    return {
      status: 500,
      data: { message: errorMessage },
    };
  }
}
