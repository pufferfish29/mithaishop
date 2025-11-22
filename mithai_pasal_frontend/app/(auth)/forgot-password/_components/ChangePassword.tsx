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
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React from "react";
import { LuLock } from "react-icons/lu";
import Link from "next/link";
import { sendResetPasswordEmail } from "@/apicalls/auth/User";
import toast from "react-hot-toast";

const changePasswordSchema = z.object({
  email: z.string().min(8, "Must be at least 8 characters"),
});

type ChangePasswordForm = z.infer<typeof changePasswordSchema>;

const ChangePassword = () => {
  const form = useForm<ChangePasswordForm>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ChangePasswordForm) => {
    try {
      const { status, data: response } = await sendResetPasswordEmail(
        data.email
      );
      if (status >= 200 && status <= 300) {
        toast.success("Please check you email to reset your password.");
      } else {
        toast.error("Please eneter a valid email.");
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Internal Server Error";
      console.log(errorMessage);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center px-4 '>
      <div className='w-full max-w-md bg-white shadow-xl rounded-2xl p-6 space-y-6 text-center'>
        <div className='flex justify-center'>
          <div className='bg-orange-500 p-3 rounded-full'>
            <LuLock className='text-white w-6 h-6' />
          </div>
        </div>

        <div>
          <h2 className='text-2xl font-bold'>Change Your Password</h2>
          <p className='text-gray-500 text-sm mt-1'>
            For security reasons, you are required to change your password.
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4 text-left'
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        type='text'
                        className='py-5 pr-12 '
                        placeholder='Enter your  email'
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type='submit'
              className='w-full bg-orange-500 text-white text-md px-4 py-4 rounded-md'
            >
              Reset
            </Button>
          </form>
        </Form>
        <div>
          <Link href={"/login"}>
            <span className='text-orange-500 text-sm underline'>
              Back to login Page
            </span>
          </Link>
        </div>
        <footer className='text-gray-400 text-sm mt-6'>
          © {new Date().toISOString().split("-")[0]} Sweet Shop. All rights
          reserved.
        </footer>
      </div>
    </div>
  );
};

export default ChangePassword;
