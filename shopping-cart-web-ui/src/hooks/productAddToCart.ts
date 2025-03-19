import kyClient from "@/lib/ky/kyClient";
import { ProductTypes } from "@/lib/types";
import { HTTPError } from "ky";

const productAddToCart = async (product: ProductTypes) => {
  try {
    const abc = await kyClient.post("items/cartitems", {
      next: { tags: ["productAddToCart"] },
      json: {
        productId: product.id,
        quantity: 1,
      },
    });

    return {
      success: true,
      message: "added to cart",
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

export default productAddToCart;
