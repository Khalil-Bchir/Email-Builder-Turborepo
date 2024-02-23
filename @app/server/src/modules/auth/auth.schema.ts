import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const loginSchema = z.object({
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
      })
      .email(),
    password: z.string(),
  });
  
  const loginResponseSchema = z.object({
    message: z.string(),
  });

  export type LoginInput = z.infer<typeof loginSchema>;

  const models = {
    loginSchema,
    loginResponseSchema,
  };
  
  export const { schemas: authSchemas, $ref } = buildJsonSchemas(models, { $id : "AuthSchema"});