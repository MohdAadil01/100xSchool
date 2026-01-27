import jwt from "jsonwebtoken";

export const generateJwtToken = async (data: { id: string; role: string }) => {
  const token = await jwt.sign(data, process.env.JWT_SECRET!, {
    expiresIn: "10d",
  });
  return token;
};
