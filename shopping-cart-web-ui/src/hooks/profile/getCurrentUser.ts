import kyServer from "@/lib/ky/kyServer";
import { DefautType } from "@/lib/types";
import { User } from "@directus/types";
import { HTTPError } from "ky";
import { cookies } from "next/headers";

const getCurrentUser = async () => {
  const token = (await cookies()).get("directus_session_token")
    ?.value as string;

  try {
    const { data } = await kyServer
      .get("users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { tags: ["getCurrentUser"] },
        searchParams: {
          fields: "id,first_name,last_name,email",
        },
      })
      .json<DefautType<User>>();

    return {
      data: data,
      isError: false,
      error: null,
    };
  } catch (error) {
    const httpError = error as HTTPError;
    const errorJson = await httpError.response.json<any>(); // eslint-disable-line

    return {
      data: null,
      isError: true,
      error: errorJson.errors[0].message,
    };
  }
};

export default getCurrentUser;
