import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.model";
import { AppError } from "../utils/AppError";
import {
  LoginInputType,
  RegisterInputType,
} from "../validators/auth.validator";
import { generateToken } from "../utils/jwt";

const register = async (input: RegisterInputType) => {
  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    role,
    property,
    address,
  } = input;

  const existingUser = await User.findOne({ email });
  if (existingUser)
    throw new AppError(400, "User with this email already exists.");

  if (role !== "superadmin" && !property)
    throw new AppError(400, "Property is required for this role");

  const hashedPassword = await bcrypt.hash(password, process.env.SALT!);

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    phone,
    role,
    property,
    address,
  });

  const token = generateToken({
    id: user.id,
    role,
    propertyId: property ? property : null,
  });

  const { password: _, ...userWithoutPassword } = user.toObject();

  return { userWithoutPassword, token };
};
const login = async (input: LoginInputType) => {
  const { email, password } = input;
  const existingUser = await User.findOne({ email });
  if (!existingUser) throw new AppError(404, "User not found.");

  const isAuthorize = bcrypt.compare(password, existingUser.password);
  if (!isAuthorize) throw new AppError(403, "You are not authorized");

  const token = generateToken({
    id: existingUser.id,
    role: existingUser.role,
    propertyId: existingUser.property ? String(existingUser.property) : null,
  });

  const { password: _, ...userWithoutPassword } = existingUser.toObject();

  return { userWithoutPassword, token };
};

export const authService = {
  register,
  login,
};
