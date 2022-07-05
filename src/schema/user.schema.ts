import z from "zod";
// zod is a validation library for typescript

export const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});
export const CreateUserOutput = z.object({
  name: z.string(),
  email: z.string().email(),
});
export type CreateUserInput = z.TypeOf<typeof createUserSchema>;
