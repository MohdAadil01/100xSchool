import express from "express";
import { authRouter } from "./routes/auth.route";
import cookieParser from "cookie-parser";
import { departmentRouter } from "./routes/department.route";
import { hospitalRouter } from "./routes/hospital.route";

export const app = express();

app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/auth", authRouter);

app.use("/api/v1/department", departmentRouter);

app.use("/api/v1/hospital", hospitalRouter);
