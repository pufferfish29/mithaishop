"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import { IoChevronBack } from "react-icons/io5";
import ProductAddForm from "../add/_components/ProductAddForm";

const AddProduct = () => {
  const router = useRouter();

  return (
    <div>
      <div className='flex flex-col md:flex-row justify-between md:items-center gap-4'>
        <h1 className='font-bold text-orange-900 text-3xl md:text-4xl'>
          Add New Sweet
        </h1>

        <Button
          onClick={() => router.back()}
          className='bg-orange-500 hover:bg-orange-600 text-white w-full md:w-auto flex items-center justify-center gap-2'
        >
          <IoChevronBack className='w-7 h-7' /> Back
        </Button>
      </div>

      <ProductAddForm />
    </div>
  );
};

export default AddProduct;
