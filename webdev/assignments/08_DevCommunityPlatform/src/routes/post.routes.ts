import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { postController } from "../controllers/post.controller";

export const postRoute = Router();

postRoute.post("/", authMiddleware, postController.create);
postRoute.get("/", postController.getPosts);
postRoute.get("/:postId", postController.getPost);
postRoute.put("/:postId", authMiddleware, postController.update);
postRoute.delete("/:postId", authMiddleware, postController.remove);
postRoute.post("/:postId/vote", authMiddleware, postController.vote);
