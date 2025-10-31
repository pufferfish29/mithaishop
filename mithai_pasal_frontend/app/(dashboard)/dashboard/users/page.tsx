import React from 'react';
import ViewUsers from './_components/ViewUsers';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const page = () => {
  return (
    <div className="max-w-[1500px] mx-auto">
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-bold text-orange-900 text-4xl">Users List</h1>
        <Link href={'/dashboard/users/add'} className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2 px-6 rounded-md py-2">
          <Plus /> Add Users
        </Link>
      </div>
      <ViewUsers />
    </div>
  );
};

export default page;
