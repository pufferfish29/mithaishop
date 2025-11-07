// pages/404.tsx
import Link from "next/link";
import { GiCandyCanes, GiDonut } from "react-icons/gi";
import { CiLollipop } from "react-icons/ci";

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-orange-50 text-orange-900 p-4'>
      <div className='flex space-x-4 mb-8 text-6xl'>
        <GiCandyCanes className='text-orange-400' />
        <CiLollipop className='text-yellow-400' />
        <GiDonut className='text-orange-500' />
      </div>

      <h1 className='text-6xl font-bold mb-4'>404</h1>
      <h2 className='text-3xl font-semibold mb-4'>Oops! Page Not Found</h2>
      <p className='text-lg mb-6 text-center max-w-md'>
        Looks like the page you're searching for is hiding somewhere in the
        sweet shop!
      </p>

      <Link
        href='/dashboard/sales'
        className='bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded shadow transition-colors'
      >
        Back to Home
      </Link>
    </div>
  );
}
