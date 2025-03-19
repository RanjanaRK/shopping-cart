import kyClient from "@/lib/ky/kyClient";
import { CartItemTypes } from "@/lib/types";
import { HTTPError } from "ky";

const increaseQuantity = async (product: CartItemTypes) => {
  try {
    await kyClient.patch(`items/cartitems/${product.id}`, {
      next: { tags: ["increaseQuantity"] },
      json: {
        quantity: product.quantity + 1,
      },
    });

    return {
      success: true,
      message: "added your quantity",
    };
  } catch (error: any) {
    if (error.name === "HTTPError") {
      const httpError = error as HTTPError;
      const errorJson = await httpError.response.json<any>();

      return {
        success: false,
        message: errorJson.errors[0].message as string,
      };
    } else {
      return {
        success: false,
        message: "Network Error",
      };
    }
  }
};

export default increaseQuantity;
