import kyClient from "@/lib/ky/kyClient";
import { HTTPError } from "ky";

const deleteCartItem = async (product: string) => {
  try {
    await kyClient.delete(`items/cartitems/${product}`, {
      next: { tags: ["deleteCartItem"] },
    });

    return {
      success: true,
      message: "Item removed",
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

export default deleteCartItem;
