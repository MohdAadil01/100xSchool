import jwt from "jsonwebtoken";

const generateJwtToken = async (data: any) => {
  const token = await jwt.sign(data, process.env.JWT_SECRET!, {
    expiresIn: "10d",
  });
  return token;
};
