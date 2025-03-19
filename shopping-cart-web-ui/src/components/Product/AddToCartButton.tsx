"use client";

import { refetchShoppingCart } from "@/hooks/action";
import curentUser from "@/hooks/curentUser";
import productAddToCart from "@/hooks/productAddToCart";
import { ProductTypes } from "@/lib/types";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Button } from "../ui/button";

type AddToCartButtonPropsType = {
  product: ProductTypes;
};

const AddToCartButton = ({ product }: AddToCartButtonPropsType) => {
  const { push } = useRouter();

  const handleAddToCart = async () => {
    const { data } = await curentUser();

    if (data) {
      const { message, success } = await productAddToCart(product);

      toast.success(message);
      await refetchShoppingCart();
    }
    if (!data) {
      push("/auth/login");
    }
  };

  return (
    <>
      <Button onClick={handleAddToCart} className="w-full">
        Add to Cart
      </Button>
    </>
  );
};

export default AddToCartButton;
