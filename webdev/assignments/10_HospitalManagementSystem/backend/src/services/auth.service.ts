import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.model";
import { AppError } from "../utils/AppError";
import {
  LoginInputType,
  PatientInputType,
  StaffInputType,
} from "../validators/auth.validator";
import { ENV } from "../config/env.config";
import { Patient } from "../models/PatientProfile.model";
import { Doctor } from "../models/DoctorProfile.model";

const registerPatient = async (input: PatientInputType) => {
  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    dateOfBirth,
    bloodGroup,
    emergencyContact,
    medicalHistory,
    allergies,
  } = input;

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new AppError(401, "Email already in-use.");

  const hashedPassword = await bcrypt.hash(password, ENV.SALT || 10);

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    phone,
    role: "patient",
  });

  await Patient.create({
    user: user._id,
    dateOfBirth,
    bloodGroup,
    emergencyContact,
    medicalHistory,
    allergies,
  });

  const { password: _, ...safeUser } = user.toObject();

  const token = jwt.sign({ id: user._id }, ENV.JWT_SECRET!);

  return {
    user: safeUser,
    token,
  };
};

const registerStaff = async (input: StaffInputType) => {
  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    role,
    hospital,
    specialization,
    qualification,
    experience,
    consultationFee,
    department,
  } = input;

  if (role === "doctor") {
    if (
      !specialization ||
      !qualification ||
      !consultationFee ||
      !department ||
      !experience
    ) {
      throw new AppError(
        400,
        "Doctor requires specialization, qualification, fee, department and hospital",
      );
    }
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) throw new AppError(400, "Email already in-use");

  const hashedPassword = await bcrypt.hash(password, ENV.SALT || 10);

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    phone,
    role,
  });

  if (role === "doctor") {
    const doctor = await Doctor.create({
      user: user._id,
      specialization,
      qualification,
      experience,
      consultationFee,
      department,
      hospital,
    });
  }

  const token = jwt.sign({ id: user._id }, ENV.JWT_SECRET!);

  const { password: _, ...safeUser } = user.toObject();

  return {
    user: safeUser,
    token,
  };
};

const login = async (input: LoginInputType) => {
  const { email, password } = input;
  const user = await User.findOne({ email });
  if (!user) throw new AppError(404, "Email not exists");

  const isAuthenticated = await bcrypt.compare(password, user.password);

  if (!isAuthenticated) throw new AppError(409, "Wrong credentials");

  const token = jwt.sign({ id: user._id }, ENV.JWT_SECRET!);

  const { password: _, ...safeUser } = user.toObject();
  return {
    user: safeUser,
    token,
  };
};

export const authService = {
  registerPatient,
  registerStaff,
  login,
};
