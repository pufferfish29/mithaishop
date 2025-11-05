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
import { addSales } from "@/apicalls/dashboard/sales"; // You’ll create this API call similar to addUser

// ✅ Validation Schema
const SalesSchema = z.object({
  productId: z.number().min(1, "Product ID is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  totalAmount: z.number().positive("Total amount must be greater than 0"),
});

type SalesForm = z.infer<typeof SalesSchema>;

const AddSalesForm = () => {
  const router = useRouter();

  const form = useForm<SalesForm>({
    resolver: zodResolver(SalesSchema),
    defaultValues: {
      productId: 0,
      quantity: 1,
      totalAmount: 0,
    },
  });

  const onSubmit = async (data: SalesForm) => {
    try {
      const response = await addSales(data);

      if (response && response.status >= 200 && response.status < 300) {
        toast.success("Sale added successfully!");
        router.push("/dashboard/sales");
      } else {
        toast.error("Failed to add sale");
      }
    } catch (error) {
      console.error(error);
      toast.error("Internal server error");
    }
  };

  return (
    <div className='px-20'>
      <div className='flex justify-between items-center'>
        <h1 className='font-bold text-orange-900 text-4xl'>Add New Sale</h1>
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
          {/* Product ID */}
          <FormField
            control={form.control}
            name='productId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product ID</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    placeholder='Enter product ID'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Quantity */}
          <FormField
            control={form.control}
            name='quantity'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    placeholder='Enter quantity'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Total Amount */}
          <FormField
            control={form.control}
            name='totalAmount'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Amount</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    placeholder='Enter total amount'
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
            Add Sale
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddSalesForm;
