import ProductCard from "@/components/Product/ProductCard";
import allGetProducts from "@/hooks/allGetProducts";
import getCartItems from "@/hooks/cart/getCartItems";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "ShopSy | Home",
  };
};

const page = async () => {
  const { data, error, isError } = await allGetProducts();

  if (isError) {
    console.log(error);

    return null;
  }

  return (
    <>
      <div className="grid grid-cols-1 place-items-center gap-2 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-8">
        {data?.map((i) => {
          return <ProductCard key={i.id} items={i} />;
        })}
      </div>
    </>
  );
};

export default page;
