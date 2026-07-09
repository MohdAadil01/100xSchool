import { Property } from "../models/Property.model";
import { AppError } from "../utils/AppError";
import { CreatePropertyInputType } from "../validators/property.validator";

const create = async (input: CreatePropertyInputType) => {
  const { name, address, city, country, email, phone, currency, timezone } =
    input;

  const existingProperty = await Property.findOne({ name, city });
  if (existingProperty)
    throw new AppError(
      409,
      "Property with this name already exists in the city",
    );

  const property = await Property.create({
    name,
    address,
    city,
    country,
    email,
    phone,
    currency,
    timezone,
  });

  return property.toObject();
};

export const propertyService = { create };
