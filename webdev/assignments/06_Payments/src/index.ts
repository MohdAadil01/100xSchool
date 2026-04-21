import app from "./app";
import { connectDb } from "./lib/db";

connectDb();

app.listen(process.env.PORT || 3000, () => {
  console.log("✅ Application started");
});
