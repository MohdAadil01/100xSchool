import { User } from "../models/User.model";
import { AppError } from "../utils/AppError";
import { generateToken } from "../utils/jwt";
import { AuthInputType } from "../validators/auth.validator";
import bcrypt from "bcrypt";

const register = async (input: AuthInputType) => {
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

const login = async () => {};

const logout = async () => {};

export const authService = {
  register,
  login,
  logout,
};
