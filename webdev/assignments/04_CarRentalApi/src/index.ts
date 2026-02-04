import app from "./app";
import dotenv from "dotenv";

dotenv.config();

app.listen(process.env.PORT || 3030, () => {
  console.log("✅ Application started running.");
});
