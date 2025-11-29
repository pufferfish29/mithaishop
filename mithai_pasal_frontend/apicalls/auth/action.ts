"use server";

import { signIn, signOut } from "@/auth";
// import { TLogin } from "@/schemas/authSchema";
import { LoginInterface } from "@/types/User";
// import { AuthError } from "next-auth";

export async function authenticate(formData: LoginInterface) {
  try {
    const data = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    if (!data || data.error) {
      return {
        success: false,
        error: data?.error || "Invalid credentials!!!",
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    return { success: false, error: "Something went wrong" };
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
