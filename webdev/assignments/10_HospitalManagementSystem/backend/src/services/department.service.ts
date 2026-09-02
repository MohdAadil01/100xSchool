import { Department } from "../models/Department.model";
import { Hospital } from "../models/Hospital.model";
import { AppError } from "../utils/AppError";
import {
  CreateDepartmentInputType,
  UpdateDepartmentInputType,
} from "../validators/department.validator";

const create = async (input: CreateDepartmentInputType) => {
  const { name, description, hospital } = input;
  const hospitalExists = await Hospital.findById(hospital);
  if (!hospitalExists) throw new AppError(404, "Hospital not found.");

  const departmentExists = await Department.findOne({ name, hospital });
  if (departmentExists)
    throw new AppError(409, "Department already exists in this Hospital.");

  const department = await Department.create({
    name,
    description,
    hospital,
  });

  return department.toObject();
};

const getAll = async (hospital: string, query?: { name?: string }) => {
  if (!hospital) throw new AppError(404, "Hospital ID not found");

  const hospitalExists = await Hospital.findById(hospital);
  if (!hospitalExists) throw new AppError(404, "Hospital not found.");

  let filter: any = { hospital };
  if (query?.name) filter.name = { $regex: query.name, $options: "i" };

  const departments = await Department.find(filter);

  return departments;
};

const getById = async (departmentId: string) => {
  if (!departmentId) throw new AppError(404, "Department ID not found.");

  const department = await Department.findById(departmentId);

  if (!department) throw new AppError(404, "Department not found.");

  return department.toObject();
};

const update = async (
  input: UpdateDepartmentInputType,
  hospital: string,
  departmentId: string,
) => {
  const { name, description } = input;

  const department = await Department.findOneAndUpdate(
    {
      _id: departmentId,
      hospital,
    },
    { $set: { name, description } },
    { new: true },
  );
  if (!department) throw new AppError(404, "Department not found.");

  return department.toObject();
};

export const departmentService = {
  create,
  getAll,
  getById,
  update,
};
