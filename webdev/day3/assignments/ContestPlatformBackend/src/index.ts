import express, { Request, Response } from "express";
import { config } from "dotenv";

config();

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("hi");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("App listening");
});
