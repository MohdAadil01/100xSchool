import { Request, Response } from "express";
import { AsyncHandler } from "../utils/AsyncHandler";
import { userService } from "../services/user.service";
import { ApiResponse } from "../utils/ApiResponse";

import { updateUserInputSchema } from "../validators/auth.validator";

const get = AsyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;

  const data = await userService.get(String(userId));
  return res.status(200).json(ApiResponse.ok(200, data, "Fetched User"));
});
const follow = AsyncHandler(async (req: Request, res: Response) => {
  const from = req.user?.id;
  const { userId: to } = req.params;
  const data = await userService.follow(String(from), String(to));

  return res.status(200).json(ApiResponse.ok(200, data, "Followed"));
});
const unfollow = AsyncHandler(async (req: Request, res: Response) => {
  const from = req.user?.id;
  const { userId: to } = req.params;
  const data = await userService.unfollow(String(from), String(to));

  return res.status(200).json(ApiResponse.ok(200, data, "Unfollowed"));
});
const update = AsyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const parsedBody = updateUserInputSchema.parse(req.body);

  const data = await userService.update(parsedBody, userId!);
  return res.status(200).json(ApiResponse.ok(200, data, "Updated"));
});

export const userController = {
  get,
  follow,
  unfollow,
  update,
};
