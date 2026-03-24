import { AppError } from "../utils/Error";

const signup = async () => {
  throw new AppError(300, "testing message");
};

const signin = async (message: string) => {
  console.log("signin" + message);
};

export const authService = {
  signup,
  signin,
};
