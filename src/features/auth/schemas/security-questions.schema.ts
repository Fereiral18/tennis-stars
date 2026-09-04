import { z } from "zod";

export const securityQuestionsSchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(1, "Ingresá el nombre de la empresa"),

  role: z
    .string()
    .trim()
    .min(1, "Ingresá el rol"),
});

export type SecurityQuestionsFormData = z.infer<
  typeof securityQuestionsSchema
>;
