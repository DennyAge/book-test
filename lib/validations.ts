import { z } from "zod";

export const FormSchema = z.object({
  title: z.string().min(2, {
    message: "bookNameError",
  }),
  author: z.string().min(2, {
    message: "authorError",
  }),
  price: z.string().min(1, {
    message: "priceError",
  }),
  images: z
    .array(z.string())
    .min(1, {
      message: "bookImageExist",
    })
    .max(5, {
      message: "bookImageMaxLength",
    }),
});
