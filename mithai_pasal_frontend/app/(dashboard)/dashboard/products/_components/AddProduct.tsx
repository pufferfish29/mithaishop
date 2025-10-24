'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';
import { IoChevronBack } from 'react-icons/io5';
import ProductAddForm from '../add/_components/ProductAddForm';

const AddProduct = () => {
  const router = useRouter();

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-orange-900 text-4xl">Add New Sweet</h1>
        <Button onClick={() => router.back()} className="bg-orange-500 hover:bg-orange-600 text-white">
          <IoChevronBack className="w-7 h-7" /> Back
        </Button>
      </div>
      <ProductAddForm />
    </div>
  );
};

export default AddProduct;
