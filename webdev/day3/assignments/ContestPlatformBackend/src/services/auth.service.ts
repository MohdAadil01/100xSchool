import { prisma } from "../lib/primsa";
import { AppError } from "../utils/AppError";
import bcrypt from "bcrypt";

export const signupService = async (data: {
  name: string;
  email: string;
  password: string;
  role: "creator" | "contestee";
}) => {
  const { name, email, password, role } = data;

  const existingUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (existingUser) {
    throw new AppError("User already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(
    password,
    Number(process.env.SALT_ROUNDS) || 10,
  );

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  return user;
};
