import getCartItems from "@/hooks/cart/getCartItems";
import Link from "next/link";
import Header from "../Header";
import ShoppingCartButton from "./ShoppingCartButton";
import ThemeToggle from "./ThemeToggle";

const Nav = async () => {
  const { data } = await getCartItems();

  return (
    <>
      <div className="border">
        <div className="sticky mx-auto flex max-w-screen-xl items-center justify-between gap-3 p-4 backdrop-blur">
          <div className="flex items-center gap-1">
            <Link href={"/"} className="text-2xl font-bold">
              ShopSy
            </Link>
            <ThemeToggle />
          </div>

          <div className="flex gap-2">
            <ShoppingCartButton cartitem={data} />
            <Header />
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
