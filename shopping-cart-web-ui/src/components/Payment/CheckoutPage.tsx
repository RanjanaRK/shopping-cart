"use client";

import convertToCurrency from "@/lib/convertToCurrency";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";

const CheckoutPage = ({ amount }: { amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>();

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToCurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientScrete));
  }, [amount]);

  const paymentSubmitHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setIsLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: "http://localhost:3000/payment/success",
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setErrorMessage(error.message);
    } else {
      setErrorMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center py-4 text-2xl font-light">
        Loading...
      </div>
    );
  }

  return (
    <>
      <form
        onSubmit={paymentSubmitHandle}
        className="space-y-2 rounded-md border p-4"
      >
        <PaymentElement />
        {errorMessage && <div>{errorMessage}</div>}
        <Button className="w-full">
          {!isLoading ? `Pay ${amount} ` : "Processing.."}
        </Button>
      </form>
    </>
  );
};

export default CheckoutPage;
