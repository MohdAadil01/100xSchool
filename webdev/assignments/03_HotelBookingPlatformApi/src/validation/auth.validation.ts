import z, { email } from "zod";

export const signupInputSchema = z.object({
  name: z.string().min(1, "Name too short"),
  email: z.string().email("Invalid Email"),
  password: z.string().min(6, "Password too short"),
  role: z
    .string()
    .transform((val) => val.toUpperCase())
    .pipe(z.enum(["OWNER", "CUSTOMER"])),
  phone: z.string().regex(/^\+91[6-9]\d{9}$/, {
    message: "Invalid Indian phone number (+91XXXXXXXXXX required)",
  }),
});

export const loginInputSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password too short"),
});
