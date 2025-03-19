import { File } from "@directus/types";
import { z } from "zod";
import {
  addProductSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "./zodSchema";

export type AddProductSchemaType = z.infer<typeof addProductSchema>;
export type LoginSchemaType = z.infer<typeof loginSchema>;
export type RegisterSchemaType = z.infer<typeof registerSchema>;
export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;

export type DefautType<T> = {
  data: T;
};
export type ExistingEmail = {
  email: string;
};

export type ProductTypes = {
  id: string;
  name: string;
  description: string;
  price: number;
  productImage: File;
  cartitems: CartItemTypes[];
};

export type CartItemTypes = {
  id: string;
  productId: ProductTypes;
  quantity: number;
};

export type FileType = {
  data: File;
};
