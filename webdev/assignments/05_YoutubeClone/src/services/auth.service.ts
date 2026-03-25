import { SigninInputType, SignupInputType } from "../@types/app/auth.types";
import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma";
import { AppError } from "../utils/Error";
import JWT from "../utils/jwt";

const signup = async (input: SignupInputType) => {
  const {
    email,
    password,
    gender,
    dob,
    channelName,
    banner,
    profilePicture,
    description,
  } = input;

  const hashedPassword = await bcrypt.hash(
    password,
    Number(process.env.SALT_ROUNDS) | 8,
  );

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      gender,
      dob,
      channelName,
      banner,
      profilePicture,
      description,
    },
    select: {
      email: true,
      gender: true,
      dob: true,
      channelName: true,
      profilePicture: true,
      description: true,
    },
  });

  return user;
};

const signin = async (input: SigninInputType) => {
  const { email, password } = input;
  const existingUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (!existingUser) {
    throw new AppError(404, "User not found.");
  }

  const isAuthorized = await bcrypt.compare(password, existingUser.password);
  if (!isAuthorized) {
    throw new AppError(409, "UNAUTHORIZED");
  }

  const token = JWT.generateToken({ id: existingUser.id });

  return {
    token,
  };
};

export const authService = {
  signup,
  signin,
};
