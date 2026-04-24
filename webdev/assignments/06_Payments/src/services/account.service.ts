import { CreateAccountInputType } from "../@types/app/account.type";
import { Account } from "../model/account.model";
import { AppError } from "../utils/AppError";

const create = async (input: CreateAccountInputType) => {
  const { userId, balance } = input;

  const existingAccount = await Account.findOne({
    userId,
  });
  if (existingAccount) {
    throw new AppError("User has already account created", 400);
  }

  const account = await Account.create({
    user: userId,
    balance,
  });

  return account.toObject();
};

const getAccountDetails = async (userId: string) => {
  if (!userId) throw new AppError("user Id not given", 404);

  const account = await Account.findOne({
    user: userId,
  }).populate("user", "firstName lastName email");

  if (!account) {
    throw new AppError("Account not found", 404);
  }

  return account;
};

export const accountService = {
  create,
  getAccountDetails,
};
