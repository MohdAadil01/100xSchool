import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { postController } from "../controllers/post.controller";

export const postRoute = Router();

postRoute.post("/", authMiddleware, postController.create);
postRoute.get("/", postController.getPosts);
postRoute.get("/:id", postController.getPost);
postRoute.put("/:id", authMiddleware, postController.update);
postRoute.delete("/:id", authMiddleware, postController.remove);
postRoute.post("/:id/vote", authMiddleware, postController.vote);
