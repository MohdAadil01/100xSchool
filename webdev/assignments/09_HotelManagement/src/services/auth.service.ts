import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.model";
import { AppError } from "../utils/AppError";
import {
  LoginInputType,
  RegisterInputType,
} from "../validators/auth.validator";
import { generateToken } from "../utils/jwt";
import { ENV } from "../config/env";
import { Property } from "../models/Property.model";

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

  const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
  if (existingUser) throw new AppError(409, "User already exists.");

  if (role !== "superadmin" && !property)
    throw new AppError(400, "Property is required for this role");

  const hashedPassword = await bcrypt.hash(password, Number(ENV.SALT) || 10);

  if (property) {
    const propertyExist = await Property.findById(property);
    if (!propertyExist) throw new AppError(404, "Property doesn't exists.");
  }

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

  const isAuthorize = await bcrypt.compare(password, existingUser.password);
  if (!isAuthorize) throw new AppError(401, "Invalid credentials");

  const token = generateToken({
    id: existingUser.id,
    role: existingUser.role,
    propertyId: existingUser.property ? String(existingUser.property) : null,
  });

  const { password: _, ...userWithoutPassword } = existingUser.toObject();

  return { userWithoutPassword, token };
};

const me = async (id: string) => {
  if (!id) throw new AppError(404, "Id not given");
  const existingUser = await User.findById(id);

  if (!existingUser) throw new AppError(404, "User not found with this id");
  return existingUser;
};

export const authService = {
  register,
  login,
  me,
};
