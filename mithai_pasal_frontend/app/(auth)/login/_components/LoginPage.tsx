"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GiWrappedSweet } from "react-icons/gi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

const loginSchema = z.object({
  username: z.string().min(1, "Enter at least one character"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    const res = await axios.post("http://localhost:3000/api/auth/signin", {
      emali: data.username,
      password: data.password,
    });
    console.log(res);
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 ">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-md lg:max-w-md xl:max-w-md rounded-2xl p-6 bg-white shadow-xl">
        <div className="space-y-6 text-center">
          <div className="flex justify-center">
            <div className="bg-orange-500 p-3 rounded-full">
              <GiWrappedSweet className="w-8 h-8 text-white" />
            </div>
          </div>

          <div>
            <h1 className="font-bold text-2xl sm:text-3xl">Sweet Shop Admin</h1>
            <p className="text-gray-400 text-sm sm:text-base">
              Enter your credentials to access the dashboard.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md">Username</FormLabel>
                    <FormControl>
                      <Input
                        className="py-5"
                        {...field}
                        placeholder="Enter your username"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          className="py-5 pr-12"
                          type={showPassword ? "text" : "password"}
                          {...field}
                          placeholder="Enter your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="bg-orange-500 w-full text-white text-md px-4 py-4 rounded-md"
              >
                Login
              </Button>
            </form>
          </Form>

          <div>
            <Link href={"/forgot-password"}>
              <span className="text-orange-500 text-sm hover:underline">
                Forgot Password?
              </span>
            </Link>
          </div>
          <footer className="text-gray-400 text-sm mt-6">
            © {new Date().toISOString().split("-")[0]} Sweet Shop. All rights
            reserved.
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Login;
