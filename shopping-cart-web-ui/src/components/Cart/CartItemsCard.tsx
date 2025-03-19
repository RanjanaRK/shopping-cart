import { CartItemTypes } from "@/lib/types";
import Image from "next/image";
import { Separator } from "../ui/separator";
import CartItemDeleteButton from "./CartItemDeleteButton";
import ItemsQuantityButton from "./ItemsQuantityButton";

type CartItemsCardProps = {
  items: CartItemTypes;
};

const CartItemsCard = ({ items }: CartItemsCardProps) => {
  console.log(items);

  return (
    <>
      <div className="relative w-[320px] sm:w-[350px] md:w-[420px]">
        <div className="flex gap-3 pt-6">
          <Image
            src={`http://127.0.0.1:8055/assets/${items?.productId.productImage}`}
            alt="product image"
            width={130}
            height={130}
            priority={false}
            className=""
          />
          <div className="flex flex-col gap-1">
            <h1 className="font-bold">title:{items?.productId.name}</h1>

            <div className="text-gray-700 dark:text-gray-300">
              description:{items?.productId?.description}
            </div>
            <div className="font-bold">
              price: ${items?.productId?.price * items?.quantity}
            </div>
            <ItemsQuantityButton items={items} />
          </div>
        </div>
        <CartItemDeleteButton items={items.id} />
      </div>
      <Separator />
    </>
  );
};

export default CartItemsCard;
