"use client";

import React, { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

interface Product {
  id: number;
  name: string;
  pricePerKG: number;
  unitPrice: number;
}
interface SelectProductProps {
  value: number;
  onChange: (val: number) => void;
  products?: Product[];
}

export const SelectProduct: React.FC<SelectProductProps> = ({
  value,
  onChange,
  products,
}) => {
  const [open, setOpen] = useState(false);
  const [searchedItems, setSearchedItems] = useState("");

  const selectedProductName =
    (products && products.find((p) => p.id === value)?.name) || "";

  return (
    <div className='w-full'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            className='min-w-full justify-between'
          >
            {selectedProductName || "Select product..."}
            <ChevronsUpDown className='opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-full p-0'>
          <Command className='w-full'>
            <Input
              placeholder='Search products...'
              className='w-full'
              value={searchedItems}
              onChange={(e) => {
                setSearchedItems(e.target.value);
              }}
            />
            <CommandList className='w-full'>
              <CommandEmpty>No Products found.</CommandEmpty>
              <CommandGroup className='w-full'>
                {products &&
                  products
                    .filter((p) =>
                      p.name.toLowerCase().includes(searchedItems.toLowerCase())
                    )
                    .map((product) => (
                      <CommandItem
                        key={product.id}
                        value={String(product.id)}
                        onSelect={(currentValue) => {
                          onChange(Number(currentValue));
                          setOpen(false);
                        }}
                        className='w-full'
                      >
                        {product.name}
                        <Check
                          className={cn(
                            "ml-auto",
                            value === product.id ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
