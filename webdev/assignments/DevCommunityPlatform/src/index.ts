import app from "./app";
import { connectDb } from "./config/db";
import { config } from "dotenv";

config();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  connectDb();
  console.log(`Application started to work on port ${PORT}`);
});
