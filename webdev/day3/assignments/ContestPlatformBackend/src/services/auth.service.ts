import { prisma } from "../lib/primsa";
import { AppError } from "../utils/AppError";
import bcrypt from "bcrypt";
import { generateJwtToken } from "../utils/jwt";

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

export const loginService = async (data: {
  email: string;
  password: string;
}) => {
  const { email, password: inputPassword } = data;
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (!user) throw new AppError("User not found", 404);

  const isAuthenticated = await bcrypt.compare(inputPassword, user.password);

  if (!isAuthenticated) throw new AppError("Unauthenticated", 409);

  const token = generateJwtToken({
    id: user.id,
    email: user.email,
    role: user.email,
  });

  const { password, ...userWithoutPassword } = user;

  return { userWithoutPassword, token };
};
