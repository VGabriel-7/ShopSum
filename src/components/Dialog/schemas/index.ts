import { z } from "zod";

export const FormSchemaCreateProduct = z.object({
  name: z.string().min(2, "O nome do produto é obrigatório."),
  quantity: z.coerce.number().min(0, "A quantidade do produto precisar ser igual ou maior a 0."),
  price: z.coerce.number().min(0, "O valor do produto precisar ser igual ou maior a 0.")
})

export const FormSchemaEditProduct = z.object({
  price: z.coerce.number().min(0, "O valor do produto precisar ser igual ou maior a 0.")
})

export type FormDataCreate = z.infer<typeof FormSchemaCreateProduct>;
export type FormDataEdit = z.infer<typeof FormSchemaEditProduct>;
