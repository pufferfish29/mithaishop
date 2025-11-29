import React from "react";
import Sales from "./_components/Sales";
import Graph from "./_components/Graph";
import HighestSales from "./_components/HighestSales";

import Link from "next/link";

const page = () => {
  return (
    <div className='mb-20'>
      <div className='flex flex-col md:flex-row justify-between md:items-center gap-4'>
        <div className='space-y-2'>
          <h1 className='font-bold text-orange-900 text-3xl md:text-4xl'>
            Sales Tracking Dashboard
          </h1>
          <p className='text-orange-600'>
            Daily, weekly, and monthly sales summaries.
          </p>
        </div>

        <Link
          href='/dashboard/sales/add'
          className='bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-md w-full md:w-auto text-center'
        >
          Add Sales
        </Link>
      </div>

      <Sales />
      <div className='flex gap-5 mt-6 max-lg:flex-col'>
        <div className='  w-[75%] max-lg:w-full shadow-none space-y-2'>
          <Graph />
        </div>
        <HighestSales />
      </div>
    </div>
  );
};

export default page;
