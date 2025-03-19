import kyClient from "@/lib/ky/kyClient";
import { DefautType, ExistingEmail, RegisterSchemaType } from "@/lib/types";
import { HTTPError } from "ky";

const userRegistration = async (fdata: RegisterSchemaType) => {
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

    if (data.length === 0) {
      await kyClient.post("users", {
        next: { tags: ["userRegistration"] },
        json: {
          first_name: fdata.first_name,
          last_name: fdata.last_name,
          email: fdata.email,
          password: fdata.password,
          role: process.env.USER_ROLE,
        },
      });

      return {
        success: true,
        message: "registered",
      };
    } else {
      return {
        success: false,
        message: "email already existed",
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

export default userRegistration;
