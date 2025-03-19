import kyClient from "@/lib/ky/kyClient";
import { DefautType } from "@/lib/types";
import { User } from "@directus/types";
import { HTTPError } from "ky";

const curentUser = async () => {
  try {
    const { data } = await kyClient
      .get("users/me", {
        next: { tags: ["authUser"] },
      })
      .json<DefautType<User[]>>();

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

export default curentUser;
