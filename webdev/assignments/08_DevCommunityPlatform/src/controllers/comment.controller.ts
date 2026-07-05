import { Request, Response } from "express";
import { AsyncHandler } from "../utils/AsyncHandler";
import { commentInputSchema } from "../validators/comment.validator";
import { commentService } from "../services/comment.service";
import { ApiResponse } from "../utils/ApiResponse";

const comment = AsyncHandler(async (req: Request, res: Response) => {
  const parsedBody = commentInputSchema.parse(req.body);
  const { postId } = req.params;
  const userId = req.user?.id;

  const data = await commentService.comment(
    parsedBody,
    String(userId),
    String(postId),
  );
  return res.status(201).json(ApiResponse.ok(201, data, "Commented"));
});

const reply = AsyncHandler(async (req: Request, res: Response) => {
  const parsedBody = commentInputSchema.parse(req.body);
  const userId = req.user?.id;
  const { postId, parentCommentId } = req.params;
  const data = await commentService.reply(
    parsedBody,
    userId!,
    String(postId),
    String(parentCommentId),
  );

  return res
    .status(201)
    .json(ApiResponse.ok(201, data, "Reply added to the comment"));
});

const getAll = AsyncHandler(async (req: Request, res: Response) => {
  const { postId } = req.params;
  const data = await commentService.getAll(String(postId));

  return res.status(200).json(ApiResponse.ok(200, data, "All Comments"));
});

const remove = AsyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { commentId } = req.params;
  const data = await commentService.remove(String(userId), String(commentId));
  return res.status(200).json(ApiResponse.ok(200, data, "Removed comment"));
});

const acceptAnswer = AsyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { postId, commentId } = req.params;

  const data = await commentService.acceptAnswer(
    userId!,
    String(postId),
    String(commentId),
  );

  return res.status(200).json(ApiResponse.ok(200, data, "Accepted answer"));
});

export const commentController = {
  comment,
  reply,
  getAll,
  remove,
  acceptAnswer,
};
