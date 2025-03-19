import { z } from "zod";

export const addProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(20),
});

export const registerSchema = z.object({
  first_name: z.string().min(2).max(20),
  last_name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6).max(20),
});

export const resetPasswordSchema = z.object({
  email: z.string().email(),
});
