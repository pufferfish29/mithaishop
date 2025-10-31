import React from "react";
import ViewProducts from "./_components/ViewProducts";
import { useSession } from "next-auth/react";

const page = () => {
  const { data: session } = useSession();
  return (
    <div className='max-w-[1700px] mx-auto px-10 overflow-y-auto'>
      <ViewProducts token={session?.accessToken} />
    </div>
  );
};

export default page;
