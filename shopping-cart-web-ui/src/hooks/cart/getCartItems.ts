import kyServer from "@/lib/ky/kyServer";
import { CartItemTypes, DefautType } from "@/lib/types";
import { HTTPError } from "ky";
import { cookies } from "next/headers";

const getCartItems = async () => {
  const token = (await cookies()).get("directus_session_token")
    ?.value as string;
  try {
    const { data } = await kyServer
      .get("items/cartitems", {
        next: { tags: ["getCartItems"] },
        headers: {
          Authorization: `bearer ${token}`,
        },
        searchParams: new URLSearchParams({
          fields: "*.*",

          filter: JSON.stringify({
            user_created: {
              _eq: "$CURRENT_USER",
            },
          }),
        }),
      })
      .json<DefautType<CartItemTypes[] | null>>();
    console.log(data);
    return {
      data: data,
      error: null,
      isError: false,
    };
  } catch (error) {
    const httpError = error as HTTPError;
    const errorJson = await httpError.response.json<any>();
    console.log(errorJson);
    return {
      data: null,
      isError: true,
      error: errorJson.errors[0].message,
    };
  }
};

export default getCartItems;
