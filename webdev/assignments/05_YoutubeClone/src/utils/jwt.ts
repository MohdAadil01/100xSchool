import jwt from "jsonwebtoken";

const generateToken = (payload: { id: string }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "10d",
  });

  return token;
};

const decodeToekn = (token: string) => {};

const JWT = {
  generateToken,
  decodeToekn,
};

export default JWT;
