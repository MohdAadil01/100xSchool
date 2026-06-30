import { Request, response, Response } from "express";
import { AsyncHandler } from "../utils/AsyncHandler";
import {
  createPostInputSchema,
  voteInputSchema,
} from "../validators/post.validator";
import { postService } from "../services/post.service";
import { ApiResponse } from "../utils/ApiResponse";

const create = AsyncHandler(async (req: Request, res: Response) => {
  const parsedBody = createPostInputSchema.parse(req.body);
  const response = await postService.create(parsedBody, req.user?.id!);

  return res
    .status(201)
    .json(ApiResponse.ok(201, response, "Post created successfully"));
});

const getPosts = AsyncHandler(async (req: Request, res: Response) => {
  const type = req.query.type as "post" | "question" | undefined;
  const tags = req.query.tags ? String(req.query.tags).split(",") : [];
  const posts = await postService.getPosts({ type, tags });

  return res.status(200).json(ApiResponse.ok(200, posts, "Success"));
});

const getPost = AsyncHandler(async (req: Request, res: Response) => {
  const postId = String(req.params?.postId);
  const post = await postService.getPost(postId);

  return res.status(200).json(ApiResponse.ok(200, post, "Success"));
});

const remove = AsyncHandler(async (req: Request, res: Response) => {
  const postId = String(req.params?.postId);
  const userId = String(req.user?.id);
  const response = await postService.remove(postId, userId);

  return res.status(204).json(ApiResponse.ok(204, response, "Success"));
});

const update = AsyncHandler(async (req: Request, res: Response) => {});

const vote = AsyncHandler(async (req: Request, res: Response) => {
  const userId = String(req.user?.id);
  const postId = String(req.params.postId);
  const { voteType } = req.body;

  const parsedBody = voteInputSchema.parse({ userId, postId, voteType });

  const response = await postService.vote(parsedBody);

  return res.status(200).json(ApiResponse.ok(200, response, "Voted"));
});

export const postController = {
  create,
  getPost,
  getPosts,
  update,
  remove,
  vote,
};
