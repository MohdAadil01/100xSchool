import { Hospital } from "../models/Hospital.model";
import { AppError } from "../utils/AppError";
import {
  CreateHospitalInputType,
  UpdateHospitalInputType,
} from "../validators/hospital.validator";

const create = async (input: CreateHospitalInputType) => {
  const { name, address, city, country, phone, email } = input;

  const hospitalExists = await Hospital.findOne({
    $or: [{ email }, { name, city }, { phone }],
  });
  if (hospitalExists)
    throw new AppError(
      400,
      "Same Hospital already exists please use unique details",
    );

  const hospital = await Hospital.create(input);
  return hospital.toObject();
};

const update = async (hospitalId: string, input: UpdateHospitalInputType) => {
  const { address, city, phone } = input;

  const query: UpdateHospitalInputType = {};
  if (address) query["address"] = address;
  if (city) query["city"] = city;
  if (phone) query["phone"] = phone;

  const updatedHospital = await Hospital.findByIdAndUpdate(hospitalId, query);

  if (!updatedHospital) throw new AppError(404, "Hospital doesn't exists.");

  return updatedHospital.toObject();
};

const getAll = async (query?: { name?: string; city?: string }) => {
  const hospitals = await Hospital.find({
    $or: [
      { city: query?.city },
      { name: query?.name },
      { city: query?.city, name: query?.name },
    ],
  });

  return hospitals;
};

const getById = async (hospitalId: string) => {
  const hospital = await Hospital.findById(hospitalId);
  if (!hospital) throw new AppError(404, "Hospital Not found.");

  return hospital.toObject();
};

export const hospitalService = {
  getAll,
  getById,
  create,
  update,
};
