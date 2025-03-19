import kyServer from "@/lib/ky/kyServer";
import { DefautType, ProductTypes } from "@/lib/types";
import { HTTPError } from "ky";

const allGetProducts = async () => {
  try {
    const { data } = await kyServer
      .get("items/products", {
        next: { tags: ["allGetProducts"] },
        searchParams: new URLSearchParams({
          fields: "*.*",
        }),
      })
      .json<DefautType<ProductTypes[]>>();

    console.log(data);

    return {
      data: data,
      error: null,
      isError: false,
    };
  } catch (error) {
    const httpError = error as HTTPError;
    const errorJson = await httpError.response.json<any>();

    return {
      data: null,
      isError: true,
      error: errorJson.errors[0].message,
    };
  }
};

export default allGetProducts;
