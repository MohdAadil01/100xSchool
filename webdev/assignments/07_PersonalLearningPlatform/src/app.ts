import express from "express";
import router from "./routes/problem.route";
import { config } from "dotenv";
import { prisma } from "./config/db";

config();

const app = express();
app.use(express.json());

prisma
  .$connect()
  .then(() => console.log("✅ Database connected"))
  .catch((e) => {
    console.error("❌ Database connection failed:", e);
    process.exit(1);
  });

app.use("/api/v1", router);

export default app;
