import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { accountController } from "../controller/account.controller";

export const accountRouter = Router();

accountRouter.post("/create", authMiddleware, accountController.create);
accountRouter.get(
  "/details",
  authMiddleware,
  accountController.getAccountDetails,
);
