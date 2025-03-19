"use client";

import { cartItemAction } from "@/hooks/action";
import deleteCartItem from "@/hooks/cart/deleteCartItem";
import { Trash } from "lucide-react";
import { toast } from "react-toastify";

type CartItemDeleteButtonProps = {
  items: string;
};

const CartItemDeleteButton = ({ items }: CartItemDeleteButtonProps) => {
  const cartItemDeleteFunc = async () => {
    await deleteCartItem(items);

    toast.success("remove from cart");

    await cartItemAction();
  };

  return (
    <>
      <button
        onClick={cartItemDeleteFunc}
        className="absolute bottom-0 right-1 hover:text-red-600"
      >
        <Trash size={16} />
      </button>
    </>
  );
};

export default CartItemDeleteButton;
