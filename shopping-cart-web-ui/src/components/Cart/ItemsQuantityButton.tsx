"use client";

import { cartItemAction } from "@/hooks/action";
import decreaseQuantity from "@/hooks/cart/decreaseQuantity";
import increaseQuantity from "@/hooks/cart/increaseQuantity";
import { CartItemTypes } from "@/lib/types";

type ItemsQuantityButtonProps = {
  items: CartItemTypes;
};

const ItemsQuantityButton = ({ items }: ItemsQuantityButtonProps) => {
  const handleQtyDecrease = async () => {
    await decreaseQuantity(items);

    await cartItemAction();
  };

  const handleQtyIncrease = async () => {
    await increaseQuantity(items);

    await cartItemAction();
  };

  return (
    <>
      <div className="my-2 flex items-center gap-4 text-base">
        <button
          onClick={handleQtyDecrease}
          className="rounded border-[1.2px] border-slate-300 px-2 hover:bg-foreground/10"
        >
          -
        </button>
        <div className="font-bold">{items?.quantity}</div>
        <button
          onClick={handleQtyIncrease}
          className="rounded border-[1.2px] border-slate-300 px-2 hover:bg-foreground/10"
        >
          +
        </button>
      </div>
    </>
  );
};

export default ItemsQuantityButton;
