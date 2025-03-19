"use client";

import { HandCoins } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { Button } from "../ui/button";

const SuccessPaymentPage = () => {
  const { push } = useRouter();

  setTimeout(() => {
    redirect("/");
  }, 10000);

  return (
    <>
      <div className="flex h-[80dvh] flex-col items-center justify-center gap-4">
        <div className="">
          <HandCoins size={56} />
        </div>
        <div className="text-2xl font-bold">Thankyou!</div>
        <div className="font-bold transition-colors ease-in-out">
          Payment done successfully
        </div>
        <div className="font-thin">
          You will be redirect to the home page shortly or click here to return
          home page
        </div>
        <Button onClick={() => push("/")}>Home</Button>
      </div>
    </>
  );
};

export default SuccessPaymentPage;
