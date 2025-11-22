"use client";
import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import Link from "next/link";
import { IoChevronBack } from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";

const AdminHeader = () => {
  const location = usePathname();
  const header = location?.split("/")[2]; // Might be undefined
  const headerOptions = ["Add", "Edit", "Delete"];
  const matchHeader = headerOptions.find((opt) =>
    location?.toLowerCase().includes(opt.toLowerCase())
  );

  const router = useRouter();

  const formattedHeader = header
    ? header?.charAt(0).toUpperCase() + header.slice(1)
    : "";

  const title = matchHeader
    ? `${matchHeader} ${formattedHeader}`
    : formattedHeader;

  return (
    <div className='border-b-[1.5px] shadow-sm w-full mb-7 px-2'>
      <SidebarTrigger className='mb-2' />

      <div className='my-2'>
        <Link href='' className='flex gap-2 items-center'>
          <IoChevronBack className='w-7 h-7' />

          <p
            className='text-3xl font-bold'
            onClick={() => router.push("/dashboard/sales")}
          >
            {title}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default AdminHeader;
