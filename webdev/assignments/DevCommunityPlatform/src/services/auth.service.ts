import { User } from "../models/User.model";
import { AppError } from "../utils/AppError";
import { generateToken } from "../utils/jwt";
import {
  LoginInputType,
  RegisterInputType,
} from "../validators/auth.validator";
import bcrypt from "bcrypt";

const register = async (input: RegisterInputType) => {
  const { name, email, password } = input;
  const hashPassword = await bcrypt.hash(
    password,
    Number(process.env.SALT_ROUNDS) || 8,
  );

  const existingUser = await User.findOne({
    email,
  });
  if (existingUser) {
    throw new AppError(400, "Email already exists.");
  }

  const user = await User.create({
    name,
    email,
    password: hashPassword,
  });
  const { password: _, ...safeUser } = user.toObject();
  const token = generateToken({ id: String(user._id) });
  return {
    user: safeUser,
    token,
  };
};

const login = async (input: LoginInputType) => {
  const { email, password } = input;
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    throw new AppError(404, "User not registered");
  }
  const isAuthenticated = await bcrypt.compare(password, existingUser.password);
  if (!isAuthenticated) {
    throw new AppError(401, "Wrong Credentials");
  }

  const token = generateToken({ id: String(existingUser._id) });
  const { password: _, ...safeUser } = existingUser.toObject();

  return {
    token,
    user: safeUser,
  };
};

const me = async (id: string) => {
  const existingUser = await User.findById(id);
  if (!existingUser) {
    throw new AppError(404, "User not found.");
  }
  const { password, ...safeUser } = existingUser.toObject();
  return { user: safeUser };
};

const logout = async () => {};

export const authService = {
  register,
  login,
  logout,
  me,
};
