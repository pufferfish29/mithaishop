"use client";

import React, { useState } from "react";
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
import { useSession } from "next-auth/react";
import { useGetAllProducts } from "@/hooks/productQueries";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SalesSchema = z.object({
  productId: z.number().min(1, "Product ID is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  totalAmount: z.number().positive("Total amount must be greater than 0"),
});

type SalesForm = z.infer<typeof SalesSchema>;

const AddSalesForm = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [limit, setLimit] = useState(1);
  const [pageParams, setPageParams] = useState(1);

  const { data: products } = useGetAllProducts(
    session?.accessToken,
    pageParams,
    limit
  );

  const form = useForm<SalesForm>({
    resolver: zodResolver(SalesSchema),
    defaultValues: {
      productId: 0,
      quantity: undefined,
      totalAmount: undefined,
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
    <div className=''>
      <div className='flex flex-col md:flex-row justify-between md:items-center gap-4'>
        <h1 className='font-bold text-orange-900 text-3xl md:text-4xl'>
          Add New Sale
        </h1>

        <Button
          onClick={() => router.back()}
          className='bg-orange-500 hover:bg-orange-600 text-white w-full md:w-auto flex items-center justify-center gap-2'
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
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    value={field.value ? String(field.value) : ""}
                  >
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Select a product' />
                    </SelectTrigger>
                    <SelectContent>
                      {products && products.items.length > 0 ? (
                        products?.items?.map((item) => (
                          <SelectItem
                            defaultValue={products?.items[0].id}
                            value={String(item.id)}
                            key={item.id}
                          >
                            {item.name.charAt(0).toUpperCase() +
                              item.name.slice(1)}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value='0'>No Products Available</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
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
