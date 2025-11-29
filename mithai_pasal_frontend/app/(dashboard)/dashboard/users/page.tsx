"use client";

import React, { useEffect } from "react";
import ViewUsers from "./_components/ViewUsers";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const page = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user.role === "user") {
      router.push("/dashboard/sales");
    }
  }, [session?.user.role]);

  return (
    <div className='max-w-[1500px] mx-auto'>
      <div className='px-10'>
        <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-5'>
          <h1 className='font-bold text-orange-900 text-3xl md:text-4xl'>
            Users List
          </h1>

          <Link
            href='/dashboard/users/add'
            className='bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center gap-2 px-6 rounded-md py-2 w-full md:w-auto'
          >
            <Plus /> Add Users
          </Link>
        </div>

        <ViewUsers />
      </div>
    </div>
  );
};

export default page;
