import { SignupInputType } from "../@types/app/auth.types";

export const signupService = async (input: SignupInputType) => {
  const { email, password, name, role, phone } = input;
};
