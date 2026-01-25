import jwt from "jsonwebtoken";

export const generateJwtToken = (data: {
  id: number;
  email: string;
  role: string;
}) => {
  const token = jwt.sign(data, process.env.JWT_SECRET!, { expiresIn: "10d" });
  return token;
};
