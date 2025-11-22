"use client";

import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { IoChevronBack } from "react-icons/io5";
import { addUser } from "@/apicalls/dashboard/user";
import { useSession } from "next-auth/react";

const UserSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type UserForm = z.infer<typeof UserSchema>;

const UserAddForm = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const form = useForm<UserForm>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: UserForm) => {
    try {
      // if (data.password !== data.confirmPassword) {
      //   return toast.error("Password do not match");
      // }

      const payload = {
        username: data.username,
        email: data.email,
        password: data.password,
      };
      const response = await addUser(payload, session?.accessToken as string);

      if (response && response?.status >= 200 && response?.status < 300) {
        toast.success("User added successfully");
        router.push("/dashboard/users");
      } else {
        toast.error("Failed to add user");
      }
    } catch (error) {
      toast.error("Internal server error");
      console.error(error);
    }
  };

  return (
    <div className='px-20'>
      <div className='flex justify-between items-center'>
        <h1 className='font-bold text-orange-900 text-4xl'>Add New Users</h1>
        <Button
          onClick={() => router.back()}
          className='bg-orange-500 hover:bg-orange-600 text-white'
        >
          <IoChevronBack className='w-7 h-7' /> Back
        </Button>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-6 mt-10 bg-white px-10 py-6 rounded-2xl shadow-md'
        >
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Enter username' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type='email' {...field} placeholder='Enter email' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    {...field}
                    placeholder='Enter password'
                  />
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
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    {...field}
                    placeholder='Confirm password'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className='w-full bg-orange-500 h-11 text-[18px]'
            type='submit'
          >
            Add User
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UserAddForm;
