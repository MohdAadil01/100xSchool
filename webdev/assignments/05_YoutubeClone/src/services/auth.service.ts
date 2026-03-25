import { SignupInputType } from "../@types/app/auth.types";
import { AppError } from "../utils/Error";

const signup = async (input: SignupInputType) => {
  const {
    email,
    password,
    gender,
    dob,
    channelName,
    banner,
    profilePicture,
    description,
  } = input;
};

const signin = async (message: string) => {
  console.log("signin" + message);
};

export const authService = {
  signup,
  signin,
};
