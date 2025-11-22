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
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { LuLock } from "react-icons/lu";
import Link from "next/link";

const ResetPasswordSchema = z
  .object({
    currentPassword: z.string().min(8, "Must be at least 8 characters"),
    newPassword: z.string().min(8, "Must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Must be at least 8 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ResetPasswordForm = z.infer<typeof ResetPasswordSchema>;

const ResetPassword = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const form = useForm<ResetPasswordForm>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: ResetPasswordForm) => {
    console.log(data);
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
              name='currentPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        type={showCurrent ? "text" : "password"}
                        className='py-5 pr-12 '
                        placeholder='Enter your current password'
                        {...field}
                      />
                      <button
                        type='button'
                        onClick={() => setShowCurrent((prev) => !prev)}
                        className='absolute inset-y-0 right-3 flex items-center text-gray-500'
                      >
                        {showCurrent ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='newPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        type={showNew ? "text" : "password"}
                        className='py-5 pr-12 '
                        placeholder='Enter your new password'
                        {...field}
                      />
                      <button
                        type='button'
                        onClick={() => setShowNew((prev) => !prev)}
                        className='absolute inset-y-0 right-3 flex items-center text-gray-500'
                      >
                        {showNew ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        type={showConfirm ? "text" : "password"}
                        className='py-5 pr-12 '
                        placeholder='Confirm your new password'
                        {...field}
                      />
                      <button
                        type='button'
                        onClick={() => setShowConfirm((prev) => !prev)}
                        className='absolute inset-y-0 right-3 flex items-center text-gray-500'
                      >
                        {showConfirm ? <FaEyeSlash /> : <FaEye />}
                      </button>
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
              Update Password
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

export default ResetPassword;
