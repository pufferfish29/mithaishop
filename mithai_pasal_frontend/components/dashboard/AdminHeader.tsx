'use client';
import React from 'react';
import { SidebarTrigger } from '../ui/sidebar';
import Link from 'next/link';
import { IoChevronBack } from 'react-icons/io5';
import { usePathname } from 'next/navigation';

const AdminHeader = () => {
  const location = usePathname();
  const header = location.split('/')[2];
  const headerOptions = ['Add', 'Edit', 'Delete'];
  const matchHeader = headerOptions.find((opt) => location.includes(opt.toLowerCase()));

  return (
    <div className="border-b-[1.5px] shadow-sm w-full mb-7 px-2">
      <SidebarTrigger className="mb-2" />
      <div className="my-2">
        <Link href={''} className="flex gap-2 items-center">
          <IoChevronBack className="w-7 h-7" />
          <p className="text-3xl font-bold">{matchHeader ? `${matchHeader} ${header.toUpperCase()[0] + header.slice(1)}` : ` ${header.toUpperCase()[0] + header.slice(1)}`}</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminHeader;
