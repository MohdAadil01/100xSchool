import bcrypt from "bcrypt";
import { LoginInput, SignupInput } from "../@types/app/user.types";
import { User } from "../model/user.model";
import { AppError } from "../utils/AppError";
import { generateToken } from "../utils/jwt";

const singup = async (input: SignupInput) => {
  const { email, password, firstName, lastName } = input;

  const existingUser = await User.findOne({
    email,
  });
  if (existingUser) {
    throw new AppError("User already exists", 400);
  }

  const hashedPassword = await bcrypt.hash(
    password,
    Number(process.env.SALT_ROUNDS)!,
  );

  const user = await User.create({
    email,
    password: hashedPassword,
    firstName,
    lastName,
  });

  const { password: ext, ...userWithoutPassword } = user;

  return userWithoutPassword;
};
const login = async (input: LoginInput) => {
  const { email, password } = input;

  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError("User not found", 404);
  }

  const token = generateToken(String(user._id));

  return token;
};

export const userService = {
  singup,
  login,
};
