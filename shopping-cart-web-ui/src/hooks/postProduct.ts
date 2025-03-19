import kyClient from "@/lib/ky/kyClient";
import { AddProductSchemaType, FileType } from "@/lib/types";

import { HTTPError } from "ky";

const postProduct = async (fdata: AddProductSchemaType, fileInput: File[]) => {
  const formData = new FormData();
  formData.append("file", fileInput[0]);

  try {
    const postFile = await kyClient
      .post("files", {
        body: formData,
      })
      .json<FileType>();

    console.log(postFile);

    const abc = await kyClient.post("items/products", {
      next: { tags: ["postProduct"] },
      json: {
        name: fdata.name,
        description: fdata.description,
        price: fdata.price,
        productImage: postFile.data.id,
      },
    });

    console.log(abc);

    return {
      success: true,
      message: "Product added",
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

export default postProduct;
