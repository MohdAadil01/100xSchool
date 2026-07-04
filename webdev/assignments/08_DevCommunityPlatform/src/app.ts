import express from "express";
import cors from "cors";
import { errorMiddleware } from "./middleware/error.middleware";
import { authRoute } from "./routes/auth.routes";
import { postRoute } from "./routes/post.routes";
import { commentRoute } from "./routes/comment.route";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  }),
);

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/posts", postRoute);
app.use("/api/v1/comments", commentRoute);

app.use(errorMiddleware);

export default app;
