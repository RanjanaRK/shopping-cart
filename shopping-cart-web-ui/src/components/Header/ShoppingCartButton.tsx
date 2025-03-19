"use client";

import { CartItemTypes } from "@/lib/types";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

type ShoppingCartButtonPropsType = {
  cartitem: CartItemTypes[] | null;
};

const ShoppingCartButton = ({ cartitem }: ShoppingCartButtonPropsType) => {
  const { push } = useRouter();

  return (
    <>
      <Button
        onClick={() => push("/shopping-cart")}
        size={"sm"}
        variant={"ghost"}
        className="hover:font-bold"
      >
        {cartitem?.length}
        <ShoppingCart />
      </Button>
    </>
  );
};

export default ShoppingCartButton;
