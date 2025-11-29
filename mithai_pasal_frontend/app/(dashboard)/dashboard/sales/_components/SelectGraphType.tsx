"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllProducts } from "@/hooks/productQueries";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { ProductInteface } from "./Graph";
import { useGetWeekSales } from "@/hooks/salesQueries";

interface Props {
  type: string;
  setType: (type: "PRODUCT" | "OVERALL") => void;
  productName: string;
  setProductName: (productName: string) => void;
  selecteProduct: ProductInteface | null;
  setSelectedProduct: (value: ProductInteface) => void;
}

const SelectGraphType = ({
  type,
  setType,
  productName,
  setProductName,
  selecteProduct,
  setSelectedProduct,
}: Props) => {
  const [limit, setLimit] = useState(1);
  const [pageParams, setPageParams] = useState(1);

  const { data: session } = useSession();

  const { data: products } = useGetAllProducts(
    session?.accessToken,
    pageParams,
    limit
  );

  const { data: weeklySales } = useGetWeekSales(session?.accessToken, 1, 1, 1);

  return (
    <div className='space-y-2 mb-2 space-x-5 w-full'>
      <p>Graph Type:</p>

      <select
        className='w-full bg-white py-2 px-2 border rounded-md'
        onChange={(e) => setType(e.target.value as "PRODUCT" | "OVERALL")}
        defaultValue={""}
      >
        <option value='' disabled>
          Select Graph Type
        </option>
        <option value='OVERALL'>Overall Sales</option>
        <option value='PRODUCT'>Product-wise Sales</option>
      </select>

      {type === "PRODUCT" && (
        <div>
          <p>Select Product:</p>
          <Select
            onValueChange={(value) => {
              setProductName(value);

              const selectedProduct =
                weeklySales &&
                weeklySales?.series.find((item) => item.productName === value);

              if (selectedProduct) {
                setSelectedProduct(selectedProduct);
              }
            }}
          >
            <SelectTrigger className='w-full bg-white'>
              <SelectValue placeholder='Select a product' />
            </SelectTrigger>
            <SelectContent>
              {products && products.items.length > 0 ? (
                products?.items?.map((item) => (
                  <SelectItem
                    defaultValue={products?.items[0].name}
                    value={String(item.name)}
                    key={item.id}
                  >
                    {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value='0'>No Products Available</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};

export default SelectGraphType;
