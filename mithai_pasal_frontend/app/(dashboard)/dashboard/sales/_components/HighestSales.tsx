import Image from 'next/image';
import React from 'react';

const data = [
  {
    id: 1,
    name: 'Colorful Macarons',
    price: '2,250',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
    unitSold: 150,
  },
  {
    id: 2,
    name: 'Cotton Candy',
    price: '1,800',
    image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=600&q=80',
    unitSold: 120,
  },
  {
    id: 3,
    name: 'Colorful Macarons',
    price: '1,500',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
    unitSold: 150,
  },
  {
    id: 4,
    name: 'Cotton Candy',
    price: '1,200',
    image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=600&q=80',
    unitSold: 120,
  },
  {
    id: 5,
    name: 'Colorful Macarons',
    price: '1,500',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
    unitSold: 150,
  },
  {
    id: 6,
    name: 'Cotton Candy',
    price: '1,200',
    image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=600&q=80',
    unitSold: 120,
  },
];

const HighestSales = () => {
  return (
    <div className="w-[25%] bg-orange-200  px-5 py-5 rounded-xl">
      <p className="text-orange-700 font-bold text-xl">Top Selling Products</p>
      <div className="space-y-8 mt-10">
        {data &&
          data.map((item) => (
            <div className="flex gap-2 items-center">
              <Image src={item.image} alt={item.name} width={120} height={120} className="rounded-xl" />
              <div className="flex  gap-10 items-center">
                <div>
                  <p className="text-orange-700 font-bold">{item.name}</p>
                  <p className="text-sm text-orange-600">{item.unitSold} units sold</p>
                </div>
                <p className="text-orange-700 font-bold">${item.price}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default HighestSales;
