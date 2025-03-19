import kyClient from "@/lib/ky/kyClient";
import { DefautType, ExistingEmail, LoginSchemaType } from "@/lib/types";
import { HTTPError } from "ky";

const userLogin = async (fdata: LoginSchemaType) => {
  try {
    const { data } = await kyClient
      .get("users", {
        next: { tags: ["isExistingEmail"] },
        searchParams: {
          filter: JSON.stringify({
            email: fdata.email,
          }),
        },
      })
      .json<DefautType<ExistingEmail[]>>();

    if (data.length === 1) {
      await kyClient.post("auth/login", {
        next: { tags: ["userLogin"] },
        json: {
          email: fdata.email,
          password: fdata.password,
          mode: "session",
        },
      });

      return {
        success: true,
        message: "logged in",
      };
    } else {
      return {
        success: false,
        message: "email doesn't exist",
      };
    }
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

export default userLogin;
