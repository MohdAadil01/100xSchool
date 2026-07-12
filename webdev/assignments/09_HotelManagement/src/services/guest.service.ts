import { Guest } from "../models/Guest.model";
import { AppError } from "../utils/AppError";
import {
  CreateGuestInputType,
  SearchGuestQueryType,
  UpdateGuestInputType,
} from "../validators/guest.validator";

const create = async (input: CreateGuestInputType) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    nationality,
    idNumber,
    idType,
    dateOfBirth,
    membershipType,
    memberId,
    address,
    notes,
    property,
  } = input;

  const existingGuest = await Guest.findOne({ email, property });
  if (existingGuest)
    throw new AppError(409, "Guest already present in the property.");

  const guest = await Guest.create({
    firstName,
    lastName,
    email,
    phone,
    nationality,
    idNumber,
    idType,
    dateOfBirth,
    membershipType,
    memberId,
    address,
    notes,
    property,
  });

  return guest;
};

const getAll = async (property: string) => {
  const guests = await Guest.find({ property });
  return guests;
};

const getById = async (id: string) => {
  const guest = await Guest.findById(id);
  if (!guest) throw new AppError(404, "Guest not found.");

  return guest;
};

const update = async (id: string, input: UpdateGuestInputType) => {
  const { firstName, lastName, memberId, membershipType, address, notes } =
    input;

  let query: any = {};
  if (firstName) query.firstName = firstName;
  if (lastName) query.lastName = lastName;
  if (memberId) query.memberId = memberId;
  if (membershipType) query.membershipType = membershipType;
  if (address) query.address = address;
  if (notes) query.notes = notes;

  const guest = await Guest.findByIdAndUpdate(
    id,
    {
      $set: query,
    },
    { new: true },
  );

  if (!guest) throw new AppError(404, "Guest with this id is not found.");
  return guest;
};

const search = async (input: SearchGuestQueryType, property: string) => {
  const { lastName, email } = input;

  if (!lastName && !email)
    throw new AppError(400, "Provide atleast the lastname or email");

  let query: any = {};
  query.property = property;
  if (lastName) query.lastName = { $regex: lastName, $options: "i" };
  if (email) query.email = { $regex: email, $options: "i" };

  const guest = await Guest.find(query);
  return guest;
};

export const guestService = {
  create,
  getAll,
  getById,
  update,
  search,
};
