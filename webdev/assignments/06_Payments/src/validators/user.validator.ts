import z from "zod";

const singupSchema = z.object({
  email: z.string().trim().email("Email expected"),
  password: z.string().trim().min(6, "Password too short"),
  firstName: z.string().trim().min(1, "First name too short"),
  lastName: z.string().trim().min(1, "Last name too short"),
});

const loginSchema = z.object({
  email: z.string().trim().email("Email expected"),
  password: z.string().trim().min(6, "Password too short"),
});

export const userValidators = {
  singupSchema,
  loginSchema,
};
