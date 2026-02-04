import bcrypt from "bcrypt";
import { AuthInputType } from "../@types/application/auth.types";
import { prisma } from "../lib/db";
import { AppError } from "../utils/Error";
import { generateToken } from "../utils/jwt";

export const signup = async (input: AuthInputType) => {
  const { username, password } = input;
  const existingUser = await prisma.user.findFirst({
    where: {
      username,
    },
  });
  if (existingUser) throw new AppError(409, "username already exists");

  const user = await prisma.user.create({
    data: {
      username,
      password,
    },
  });
  return user;
};

export const loginService = async (input: AuthInputType) => {
  const { username, password } = input;
  const existingUser = await prisma.user.findFirst({
    where: {
      username,
    },
  });
  if (!existingUser) throw new AppError(401, "user does not exist");

  const isPasswordCorrect = await bcrypt.compare(
    password,
    existingUser.password,
  );
  if (!isPasswordCorrect) throw new AppError(401, "incorrect password");

  const token = generateToken({ id: existingUser.id, username });
};
