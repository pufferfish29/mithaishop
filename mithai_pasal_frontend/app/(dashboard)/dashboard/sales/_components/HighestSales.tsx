"use client";

import { useGetTopSellingProducts } from "@/hooks/salesQueries";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const HighestSales = () => {
  const { data: session } = useSession();

  const { data } = useGetTopSellingProducts(session?.accessToken, 1, 1, 7);

  return (
    <div className='w-[25%] max-lg:w-full bg-orange-200  px-5 py-5 rounded-xl '>
      <p className='text-orange-700 font-bold text-xl'>Top Selling Products</p>
      <div className='space-y-8 mt-10'>
        {data && data.length > 0 ? (
          data.map((item, idx) => (
            <div key={idx} className='flex gap-2 items-center'>
              <p className='text-orange-700 font-bold text-xl'>{idx + 1}.</p>
              <div className='flex  gap-10 items-center'>
                <div>
                  <p className='text-orange-700 font-bold'>
                    Product Name: {item.productName}
                  </p>
                  <p className='text-sm text-orange-600'>
                    Quantity: {item.totalQuantity} quantity sold
                  </p>
                </div>
                <p className='text-orange-700 font-bold'>${item.totalAmount}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No sales till now</p>
        )}
      </div>
    </div>
  );
};

export default HighestSales;
