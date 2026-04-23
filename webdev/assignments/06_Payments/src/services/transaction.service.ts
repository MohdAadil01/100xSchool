import mongoose from "mongoose";
import { TransferInputType } from "../@types/app/transaction.types";
import { AppError } from "../utils/AppError";
import { User } from "../model/user.model";
import { Account } from "../model/account.model";
import { Transaction } from "../model/transaction.model";

const transfer = async (input: TransferInputType) => {
  const { from, to, amount, status } = input;
  if (to == from) {
    throw new AppError("Cannot transfer to your own account", 400);
  }
  const fromUser = await User.findById(from);
  const toUser = await User.findById(to);
  if (!fromUser) throw new AppError("Sender not found with the given id", 404);
  if (!toUser) throw new AppError("Receiver not found with the given id", 404);
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const sender = await Account.findOne({ userId: from }).session(session);
    const receiver = await Account.findOne({ userId: to }).session(session);

    if (!sender) throw new AppError("Sender with user Id not found", 404);
    if (!receiver) throw new AppError("Receiver with user Id not found", 404);

    if (sender.balance < amount) {
      throw new AppError("Insufficient balance", 400);
    }
    sender.balance -= amount;
    sender.save({ session });

    receiver.balance += amount;
    receiver.save({ session });

    const txn = await Transaction.create([
      {
        from,
        to,
        amount,
        status: "completed",
      },
    ]);

    await session.commitTransaction();

    return txn[0].toObject();
  } catch (error) {
    await session.abortTransaction();
    console.log(error);
    throw new AppError("Transaction failed", 400);
  } finally {
    session.endSession();
  }
};

const getTransactionDetails = async () => {};

export const txnService = {
  transfer,
  getTransactionDetails,
};
