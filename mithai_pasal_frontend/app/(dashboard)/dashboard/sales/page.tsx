import React from "react";
import Sales from "./_components/Sales";
import Graph from "./_components/Graph";
import HighestSales from "./_components/HighestSales";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  return (
    <div className='mb-20'>
      <div className='flex justify-between items-center '>
        <div className='space-y-2'>
          <h1 className='font-bold text-orange-900 text-4xl'>
            Sales Tracking Dashboard
          </h1>
          <p className='text-orange-600'>
            Daily, weekly, and monthly sales summaries.
          </p>
        </div>
        <Link
          href={"/dashboard/sales/add"}
          className='bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-md'
        >
          Add Sales
        </Link>
      </div>
      <Sales />
      <div className='flex gap-5 mt-6'>
        <Graph />
        <HighestSales />
      </div>
    </div>
  );
};

export default page;
