'use client';

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { baseUrl } from '@/lib/baseUrl';
import { useRouter } from 'next/navigation';

import React from 'react';
import toast from 'react-hot-toast';

interface Props {
  url: string;
  name: string;
  setId: (value: number) => void | undefined;
  setDelete: (value: boolean) => void;
  deleting: boolean;
}

const Alert = ({ url, name, setDelete, setId, deleting }: Props) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const response = await fetch(`${baseUrl}${url}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status >= 200 && response.status < 300) {
        toast.success(`${name} deleted successfully...`);
        router.refresh();
        setId(-1);
        setDelete(false);
      } else {
        toast.success(`Failed to delete the ${name}`);
        setId(-1);
        setDelete(false);
      }
      router.refresh();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Something went wrong';
      console.log(errorMessage);
    }
  };

  return (
    <AlertDialog open={deleting}>
      <AlertDialogContent className="bg-orange-100 border-orange-100 ">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="">This action cannot be undone. This will permanently delete the product and remove given product from our servers.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-orange-400 text-white hover:bg-orange-500" onClick={() => handleDelete()}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Alert;
