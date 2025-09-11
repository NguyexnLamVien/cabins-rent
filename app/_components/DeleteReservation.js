"use client";

import { HiTrash } from "react-icons/hi2";
import { useTransition } from "react";
import SpinnerMini from "./SpinnerMini";

function DeleteReservation({ bookingId, onDelete }) {

  const [isPending, startTransition] = useTransition();

  function handleDelete(bookingId) {
    if (confirm("Are you sure you want to delete this reservation?"))
      startTransition(() => onDelete(bookingId));
  }

  return (
    <button className='group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900' onClick={() => handleDelete(bookingId)}>
      {isPending ? <div className="text-center"> <SpinnerMini /></div> : <> <HiTrash className='h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors' />
        <span className='mt-1'>Delete</span></>}
    </button>
  );
}

export default DeleteReservation;
