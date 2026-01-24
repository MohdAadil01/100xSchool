import prisma from "../lib/prisma";
import { AppError } from "../utils/AppError";
import { generateToken } from "../utils/jwt";
import { LoginInputType, SignupInputType } from "../validation/auth.validation";
import bcyrpt from "bcrypt";

export const signupService = async (data: SignupInputType) => {
  const { email, password, role, name } = data;
  const existingUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (existingUser) throw new AppError("Email exists.", 400);
  const hashPassword = await bcyrpt.hash(
    password,
    Number(process.env.SALT_ROUNDS!),
  );
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashPassword,
      role,
    },
    select: {
      name: true,
      id: true,
      email: true,
      role: true,
    },
  });

  return user;
};

export const loginService = async (data: LoginInputType) => {
  const { email, password } = data;
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (!user) throw new AppError("Email not found", 404);
  const isAuthorized = await bcyrpt.compare(password, user.password);
  if (!isAuthorized) throw new AppError("Invalid Credentials", 400);

  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  const { password: hashPassword, ...userWithoutPassword } = user;

  return { user: userWithoutPassword, token };
};
