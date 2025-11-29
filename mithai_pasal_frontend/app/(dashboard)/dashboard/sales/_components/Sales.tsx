"use client";

import {
  useGetMonthSales,
  useGetTodaySales,
  useGetWeekSales,
} from "@/hooks/salesQueries";
import { useSession } from "next-auth/react";
import React from "react";

const Sales = () => {
  const { data: session } = useSession();

  const { data: daily } = useGetTodaySales(session?.accessToken, 1, 1, 1);
  const { data: weekly } = useGetWeekSales(session?.accessToken, 1, 1, 1);
  const { data: monthly } = useGetMonthSales(session?.accessToken, 1, 1, 1);

  const dailySales =
    daily && daily?.series?.length > 0
      ? daily.series.map((s) => s.data.map((d) => d.amount))
      : "0";

  const weeklySales =
    weekly && weekly?.series?.length > 0
      ? weekly.series.map((s) => {
          const totalWeeklySales = s.data.reduce(
            (amt, current) => amt + current.amount,
            0
          );
          return totalWeeklySales;
        })
      : "0";

  const monthlySales =
    monthly && monthly?.series?.length > 0
      ? monthly.series.map((s) => {
          const totalMonthlySales = s.data.reduce(
            (amt, current) => amt + current.amount,
            0
          );
          return totalMonthlySales;
        })
      : "0";

  return (
    <div>
      <div className='flex  gap-5 mt-6 max-lg:flex-col'>
        <div className='bg-orange-200 px-10 py-8 w-1/2  max-lg:w-full space-y-2 rounded-xl '>
          <h1 className='text-orange-700'>Daily Sales</h1>
          <p className='font-bold text-orange-900 text-3xl'>${dailySales}</p>
          {/* <p className='text-green-500 font-bold'>+12.5% from yesterday</p> */}
        </div>

        <div className='bg-orange-200 px-10 py-8 w-1/2 max-lg:w-full space-y-2 rounded-xl  '>
          <h1 className='text-orange-700'>Weekly Sales</h1>
          <p className='font-bold text-orange-900 text-3xl'>
            ${weeklySales ? weeklySales[0] : "0"}
          </p>
          {/* <p className='text-green-500 font-bold'>+5.2% from last week</p> */}
        </div>

        <div className='bg-orange-200 px-10 py-8 w-1/2 max-lg:w-full space-y-2 rounded-xl  '>
          <h1 className='text-orange-700'>Monthly Sales</h1>
          <p className='font-bold text-orange-900 text-3xl'>
            ${monthlySales ? monthlySales[0] : "0"}
          </p>
          {/* <p className='text-green-500 font-bold'>+8.1% from last month</p> */}
        </div>
      </div>
    </div>
  );
};

export default Sales;
