"use client";

import { MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const GoToCartButton = () => {
  const { push } = useRouter();

  return (
    <>
      <Button
        className="w-full bg-gray-600"
        onClick={() => push("/shopping-cart")}
      >
        Go to cart <MoveRight />
      </Button>
    </>
  );
};

export default GoToCartButton;
