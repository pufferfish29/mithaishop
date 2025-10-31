"use server";

import { signIn, signOut } from "@/auth";
// import { TLogin } from "@/schemas/authSchema";
import { LoginInterface } from "@/types/User";
import { AuthError } from "next-auth";

export async function authenticate(formData: LoginInterface) {
  try {
    const data = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    if (data && data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    return "An unexpected error occurred.";
  }
}

export async function logoutUser() {
  try {
    const data = await signOut();

    return data;
  } catch (error) {
    return "Something went wrong";
  }
}
