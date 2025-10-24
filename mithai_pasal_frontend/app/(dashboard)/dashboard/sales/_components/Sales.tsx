import React from 'react';

const Sales = () => {
  return (
    <div>
      <div className="flex  gap-5 mt-6">
        <div className="bg-orange-200 px-10 py-8 w-1/2 space-y-2 rounded-xl ">
          <h1 className="text-orange-700">Daily Sales</h1>
          <p className="font-bold text-orange-900 text-3xl">$1,890.75</p>
          <p className="text-green-500 font-bold">+12.5% from yesterday</p>
        </div>

        <div className="bg-orange-200 px-10 py-8 w-1/2 space-y-2 rounded-xl  ">
          <h1 className="text-orange-700">Weekly Sales</h1>
          <p className="font-bold text-orange-900 text-3xl">$12,450</p>
          <p className="text-green-500 font-bold">+5.2% from last week</p>
        </div>

        <div className="bg-orange-200 px-10 py-8 w-1/2 space-y-2 rounded-xl  ">
          <h1 className="text-orange-700">Daily Sales</h1>
          <p className="font-bold text-orange-900 text-3xl">$45,820.50</p>
          <p className="text-green-500 font-bold">+8.1% from last month</p>
        </div>
      </div>
    </div>
  );
};

export default Sales;
