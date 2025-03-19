"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const refetchShoppingCart = async () => {
  revalidateTag("allGetProducts");

  revalidatePath("/");
};

export const logoutAction = async () => {
  revalidateTag("getCurrentUser");

  revalidatePath("/");
};

export const loginAction = async () => {
  revalidateTag("getCartItems");

  redirect("/");
};
export const cartItemAction = async () => {
  revalidateTag("getCartItems");
};
