import bcrypt from "bcrypt";
import { LoginInputType, SignupInputType } from "../@types/app/auth.types";
import { AppError } from "../utils/AppError";
import { generateJwtToken } from "../utils/jwt";
import { prisma } from "../lib/prisma";

export const signupService = async (input: SignupInputType) => {
  const { email, password, name, role, phone } = input;
  const existingUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (existingUser) throw new AppError("EMAIL_ALREADY_EXISTS", 400);

  const hashedPassword = await bcrypt.hash(
    password,
    Number(process.env.SALT_ROUNDS!),
  );

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role,
      phone,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      phone: true,
    },
  });

  return user;
};

export const loginService = async (input: LoginInputType) => {
  const { email, password: inputPassword } = input;

  const existingUser = await prisma.user.findFirst({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
      role: true,
    },
  });
  if (
    !existingUser ||
    !(await bcrypt.compare(inputPassword, existingUser?.password))
  ) {
    throw new AppError("INVALID_CREDENTIALS", 401);
  }

  const token = await generateJwtToken({
    id: existingUser.id,
    role: existingUser.role,
  });
  const { password, ...user } = existingUser;
  return {
    token,
    user,
  };
};
