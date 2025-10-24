'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { BiCloudUpload } from 'react-icons/bi';
import { BsFileEarmarkImage } from 'react-icons/bs';

const SweetsSchema = z.object({
  name: z.string().min(3, 'Name must be of 3 characters'),
  description: z.string().min(3, 'Name must be of 3 characters'),
  price: z.string(),
  productImage: z.string().min(1, 'Image cannot be empty'),
});

const ProductAddForm = () => {
  const form = useForm<z.infer<typeof SweetsSchema>>({
    resolver: zodResolver(SweetsSchema),
    defaultValues: {
      name: '',
      description: '',
      price: '',
      productImage: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof SweetsSchema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-10 bg-white px-10 py-4 rounded-2xl shadow-md">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">Sweet Name</FormLabel>
              <FormControl>
                <Input className="py-5" {...field} placeholder="e.g. Rainbow Swirl Lollipop" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">Description</FormLabel>
              <FormControl>
                <Textarea className="py-5" {...field} placeholder="A brief decription of the sweet" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">Unit Price</FormLabel>
              <FormControl>
                <Input className="py-5" {...field} placeholder="$ 4.99" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">Product Image</FormLabel>
              <FormControl>
                <div className="flex gap-2 w-full justify-between items-center ">
                  <label htmlFor="file-upload" className=" bg-[#ffbd91] rounded-2xl px-10 py-10 max-lg:hidden">
                    <BsFileEarmarkImage className="text-gray-50 w-8 h-8" />
                  </label>
                  <div
                    className="w-[90%] max-lg:w-full flex flex-col items-center justify-center  px-6 py-10 border-2
                border-dashed border-[#ffbd91] rounded-lg cursor-pointer  hover:bg-gray-50 transition-colors
                "
                  >
                    <label htmlFor="file-upload" className="flex flex-col items-center justify-center font-medium text-sm gap-2 cursor-pointer">
                      <BiCloudUpload className="w-12 h-12 text-orange-300" />
                      <span className="text-gray-600 font-medium">Click to upload or drag and drop</span>
                      <span className="text-gray-400 text-sm">PNG, JPG, GIF up to 10MB</span>
                    </label>

                    <Input type="file" accept="image/*" {...field} placeholder="Enter your username" className="hidden" id="file-upload" />
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full bg-orange-500 h-11 text-[18px]" type="submit">
          Add Product
        </Button>
      </form>
    </Form>
  );
};

export default ProductAddForm;
