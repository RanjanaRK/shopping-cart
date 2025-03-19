import kyClient from "@/lib/ky/kyClient";
import { ResetPasswordSchemaType } from "@/lib/types";
import { HTTPError } from "ky";

const resetPassword = async (fdata: ResetPasswordSchemaType) => {
  try {
    const abc = await kyClient.post("auth/password/request", {
      next: {
        tags: ["resetPassword"],
      },
      json: {
        email: fdata.email,
      },
    });

    return {
      success: true,
      message: "send link in email",
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

export default resetPassword;
