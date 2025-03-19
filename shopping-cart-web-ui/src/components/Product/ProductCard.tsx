import getCartItems from "@/hooks/cart/getCartItems";
import { ProductTypes } from "@/lib/types";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import AddToCartButton from "./AddToCartButton";
import GoToCartButton from "./GoToCartButton";

type ProductCardProps = {
  items: ProductTypes;
};

const ProductCard = async ({ items }: ProductCardProps) => {
  const productImg = `process.env.API_URL/assets`;

  const { data } = await getCartItems();

  const existingCartItem =
    data?.find((item) => item?.productId?.id === items?.id)?.productId?.id ??
    null;

  return (
    <>
      <div className="">
        <Card className="w-[320px] rounded-none pt-6 md:w-[300px]">
          <CardContent className="-6">
            <div className="space-y-2">
              <div className="space-y-2">
                <Image
                  // src={`${process.env.API_URL}/assets/${items?.productImage.id}`}
                  src={`http://127.0.0.1:8055/assets/${items?.productImage?.id}`}
                  alt="product image"
                  width={150}
                  height={150}
                  priority
                  className="h-[250px] w-full"
                />
                <div className="font-bold">{items?.name}</div>
                <div className="h-20 overflow-hidden text-gray-700">
                  {items?.description}
                </div>
                <div className="font-bold">${items?.price}</div>
              </div>

              {items.id === existingCartItem ? (
                <GoToCartButton />
              ) : (
                <AddToCartButton product={items} />
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ProductCard;
