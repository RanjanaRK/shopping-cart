"use client";

import convertToCurrency from "@/lib/convertToCurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useTheme } from "next-themes";
import { useSearchParams } from "next/navigation";
import CheckoutPage from "./CheckoutPage";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("Public is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const MainPage = () => {
  const { theme } = useTheme();

  const searchParams = useSearchParams();

  const amount = searchParams.get("amount") as number | null;

  if (!amount) {
    return (
      <div className="flex items-center justify-center py-4 text-2xl font-light">
        Amount not found
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 p-4">
        <div className=""> Your Total amount : ${amount}</div>
        <Elements
          stripe={stripePromise}
          options={{
            amount: convertToCurrency(amount),
            currency: "usd",
            mode: "payment",
            appearance: {
              theme: theme === "dark" ? "night" : "flat",
            },
          }}
        >
          <CheckoutPage amount={amount} />
        </Elements>
      </div>
    </>
  );
};

export default MainPage;
