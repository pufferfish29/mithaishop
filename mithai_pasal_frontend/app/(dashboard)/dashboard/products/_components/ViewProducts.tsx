// 'use client';

// import { Button } from '@/components/ui/button';
// import { Plus } from 'lucide-react';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import React from 'react';

// interface Props {
//   data: DataProps[];
// }

// interface DataProps {
//   id: number;
//   name: string;
//   price: number;
//   image: string;
//   description: string;
// }

// const ViewProducts = ({ data }: Props) => {
//   const router = useRouter();

//   return (
//     <div>
//       <div className="flex justify-between items-center">
//         <h1 className="font-bold text-orange-900 text-4xl">Products</h1>
//         <Button onClick={() => router.push('/dashboard/product/add')} className="bg-orange-500 hover:bg-orange-600 text-white">
//           <Plus /> Add New Product
//         </Button>
//       </div>
//       <div className=" mt-5 pb-10 ">
//         <div className="grid grid-cols-5 gap-8 ">
//           {data &&
//             data.map((product) => (
//               <div key={product.id} className="bg-white px-5 py-5 shadow rounded-xl hover:translate-y-[-12px] hover:shadow-2xl transition-all duration-200">
//                 <Image src={product.image} alt={product.description} width={200} height={200} className="w-[250px] h-[250px] rounded-xl object-center" />
//                 <div>
//                   <h4 className="text-orange-900 font-bold mt-2 text-[18px]">{product.name}</h4>
//                   <p className="text-orange-600 text-[18px] font-semibold">${product.price}</p>
//                 </div>
//               </div>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewProducts;

"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useGetAllProducts } from "@/hooks/productQueries";
import Loading from "@/components/loading";
import { MdDelete } from "react-icons/md";
// import { deleteProductById } from '@/apicalls/dashboard/product';
// import toast from 'react-hot-toast';
import Alert from "@/components/dashboard/Alert";

const ViewProducts = ({ token }: { token: string | undefined }) => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [deleting, setDeleting] = useState(false);
  const [productId, setProductId] = useState(-1);

  const {
    data: products,
    isLoading,
    isPending,
  } = useGetAllProducts(token, page, limit);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      {deleting && (
        <Alert
          deleting={deleting}
          url={`/product/${productId}`}
          name='product'
          setDelete={setDeleting}
          setId={setProductId}
        />
      )}
      <div className='flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6'>
        <h1 className='font-bold text-orange-900 text-3xl md:text-4xl'>
          Products
        </h1>

        <Button
          onClick={() => router.push("/dashboard/products/add")}
          className='bg-orange-500 hover:bg-orange-600 text-white w-full md:w-auto flex items-center justify-center gap-2'
        >
          <Plus /> Add New Product
        </Button>
      </div>

      <Table className='bg-white rounded-2xl'>
        <TableHeader>
          <TableRow>
            <TableHead>S.N</TableHead>

            <TableHead>Name</TableHead>
            <TableHead>Price per kg ($)</TableHead>
            <TableHead>Unit Price</TableHead>
            {/* <TableHead>Actions</TableHead> */}
          </TableRow>
        </TableHeader>

        <TableBody>
          {products && products?.items.length > 0 ? (
            products?.items.map((product, idx) => (
              <TableRow key={product.id} className='hover:bg-orange-50'>
                <TableCell>{idx + 1}</TableCell>
                {/* <TableCell>
                  <Image src={product.image} alt={product.description} width={50} height={50} className="rounded-lg object-cover" />
                </TableCell> */}
                <TableCell>{product?.name}</TableCell>
                <TableCell>{product?.pricePerKG}</TableCell>
                <TableCell>{product?.unitPrice}</TableCell>
                {/* <TableCell>
                  <div className='flex items-center gap-4'>
                    <Eye className='cursor-pointer  w-9 hover:bg-orange-400 hover:text-white hover:border-orange-400 shadow-md h-9 border border-black px-2 rounded-sm' />
                    <Pencil className='cursor-pointer  w-9 hover:bg-green-400 hover:text-white hover:border-green-400 shadow-md h-9 border border-black px-2 rounded-sm' />
                    <MdDelete
                      onClick={() => {
                        setProductId(product.id);
                        setDeleting(true);
                      }}
                      className='cursor-pointer  w-9 h-9 border border-black px-2 rounded-sm  hover:bg-red-400 hover:text-white hover:border-white'
                    />
                  </div>
                </TableCell> */}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className='text-center'>
                No products found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ViewProducts;
