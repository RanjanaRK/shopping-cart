import CartItemsCard from "@/components/Cart/CartItemsCard";
import TotalAmountCard from "@/components/Cart/TotalAmountCard";
import getCartItems from "@/hooks/cart/getCartItems";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "ShopSy | Cart",
  };
};

const page = async () => {
  const { data, error, isError } = await getCartItems();

  if (isError) {
    console.log(error);

    return null;
  }
  return (
    <>
      <div className="grid grid-cols-1 place-items-center gap-4 md:grid-cols-2">
        <div className="flex flex-col items-start justify-start gap-4 border p-4">
          {data?.map((items) => {
            return <CartItemsCard key={items.id} items={items} />;
          })}
        </div>

        <div className="border">
          <TotalAmountCard items={data} />
        </div>
      </div>
    </>
  );
};

export default page;
