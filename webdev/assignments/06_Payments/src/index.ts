import app from "./app";
import { connectDb } from "./lib/db";

connectDb();

app.listen(3000, () => {
  console.log("✅ Application started");
});
