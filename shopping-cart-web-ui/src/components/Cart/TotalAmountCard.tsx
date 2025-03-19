"use client";

import { CartItemTypes } from "@/lib/types";
import Link from "next/link";
import { useState } from "react";

type TotalAmountCardProps = {
  items: CartItemTypes[] | null;
};

const TotalAmountCard = ({ items }: TotalAmountCardProps) => {
  const [platformFee, setPlatformFee] = useState(10);

  const totalMRP = items?.reduce(
    (accum, item) => accum + item.quantity * item.productId.price,
    0,
  )!;
  const totalAmount = items?.reduce(() => totalMRP + platformFee, 0);

  return (
    <>
      <div className="grid w-[320px] grid-cols-4 gap-2 border p-4 sm:w-[350px]">
        <div className="col-span-4 font-bold">
          <span className="underline">Total Item</span> ({items?.length} items)
        </div>
        <div className="col-span-2">Total MRP :</div>
        <div className="">${totalMRP}</div>
        <div className="col-span-2">Platform Fee :</div>
        <div className="">${platformFee} </div>
        <div className="col-span-2 font-bold">Total Amount:</div>
        <div className="font-bold">${totalAmount} </div>
        <Link
          className="col-span-4 my-2 w-full rounded-md bg-foreground px-4 py-1 text-center font-bold text-background"
          href={`/payment?amount=${totalAmount}`}
        >
          Buy Now
        </Link>
      </div>
    </>
  );
};

export default TotalAmountCard;
