'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

interface Props {
  data: DataProps[];
}

interface DataProps {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

const ViewProducts = ({ data }: Props) => {
  const router = useRouter();

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-orange-900 text-4xl">Products</h1>
        <Button onClick={() => router.push('/dashboard/product/add')} className="bg-orange-500 hover:bg-orange-600 text-white">
          <Plus /> Add New Product
        </Button>
      </div>
      <div className=" mt-5 pb-10 ">
        <div className="grid grid-cols-5 gap-8 ">
          {data &&
            data.map((product) => (
              <div key={product.id} className="bg-white px-5 py-5 shadow rounded-xl hover:translate-y-[-12px] hover:shadow-2xl transition-all duration-200">
                <Image src={product.image} alt={product.description} width={200} height={200} className="w-[250px] h-[250px] rounded-xl object-center" />
                <div>
                  <h4 className="text-orange-900 font-bold mt-2 text-[18px]">{product.name}</h4>
                  <p className="text-orange-600 text-[18px] font-semibold">${product.price}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ViewProducts;
