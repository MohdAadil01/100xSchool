import z from "zod";

const signupInputSchema = z.object({
  username: z.string().min(2, "Username too short"),
  password: z.string().min(6, "Password too short"),
  gender: z
    .string()
    .transform((val) => val.trim().toUpperCase())
    .pipe(z.enum(["MALE", "FEMALE"])),
  dob: z.date(),
  channelName: z.string().min(2, "Channel name is too short"),
  banner: z.string().optional(),
  profilePicture: z.string().optional(),
});

const signinInputSchema = z.object({
  username: z.string().min(2, "Username too short"),
  password: z.string().min(6, "Password too short"),
});

export const authValidator = {
  signupInputSchema,
  signinInputSchema,
};
