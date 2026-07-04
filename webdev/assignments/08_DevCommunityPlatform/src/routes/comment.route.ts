import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { commentController } from "../controllers/comment.controller";

export const commentRoute = Router();

commentRoute.post("/:postId", authMiddleware, commentController.comment);
commentRoute.post(
  "/:postId/:commentId",
  authMiddleware,
  commentController.reply,
);
commentRoute.get("/:postId", commentController.getAll);
commentRoute.delete("/:commentId", authMiddleware, commentController.remove);
