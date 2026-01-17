import jwt from "jsonwebtoken";

export const generateJwtToken = (data: { email: string; role: string }) => {
  const token = jwt.sign(data, process.env.JWT_SECRET!);
  return token;
};
