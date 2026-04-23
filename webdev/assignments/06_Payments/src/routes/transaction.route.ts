import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { txnController } from "../controller/transaction.controller";

export const txnRouter = Router();

txnRouter.post("/transfer", authMiddleware, txnController.transfer);
txnRouter.get("/getall", authMiddleware, txnController.getTransactionDetails);
