'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';
import { IoChevronBack } from 'react-icons/io5';
import ProductEditForm from '../edit/_components/ProductEditForm';

const UpdateProduct = () => {
  const router = useRouter();

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-orange-900 text-4xl">Update your sweet</h1>
        <Button onClick={() => router.back()} className="bg-orange-500 hover:bg-orange-600 text-white">
          <IoChevronBack className="w-7 h-7" /> Back to product
        </Button>
      </div>
      <ProductEditForm />
    </div>
  );
};

export default UpdateProduct;
