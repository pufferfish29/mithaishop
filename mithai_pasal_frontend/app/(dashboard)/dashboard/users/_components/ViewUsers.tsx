import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Pencil } from "lucide-react";
import { MdDelete } from "react-icons/md";
const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
];
const ViewUsers = () => {
  return (
    <Table className='bg-white font-bold rounded-2xl shadow-xl '>
      <TableHeader className='px-10'>
        <TableRow>
          <TableHead className='w-[100px]'>S.N.</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className='text-right'>Role</TableHead>
          <TableHead className='text-right'>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className='px-10'>
        {invoices && invoices.length > 0 ? (
          invoices.map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell className='font-medium'>{invoice.invoice}</TableCell>
              <TableCell>{invoice.paymentStatus}</TableCell>
              <TableCell>{invoice.paymentMethod}</TableCell>
              <TableCell className='text-right'>
                {invoice.totalAmount}
              </TableCell>
              <TableCell>
                <div className='flex items-center gap-4'>
                  <Eye className='cursor-pointer  w-9 hover:bg-orange-400 hover:text-white hover:border-orange-400 shadow-md h-9 border border-black px-2 rounded-sm' />
                  <Pencil className='cursor-pointer  w-9 hover:bg-green-400 hover:text-white hover:border-green-400 shadow-md h-9 border border-black px-2 rounded-sm' />
                  <MdDelete
                    // onClick={() => {
                    //   console.log("Hello");
                    //   // setProductId(product.id);
                    //   // setDeleting(true);
                    // }}
                    className='cursor-pointer  w-9 h-9 border border-black px-2 rounded-sm  hover:bg-red-400 hover:text-white hover:border-white'
                  />
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} className='text-center'>
              No users found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className='text-right'>$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
  );
};

export default ViewUsers;
