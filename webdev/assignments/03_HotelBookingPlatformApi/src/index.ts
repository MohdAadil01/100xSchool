import app from "./app";
import { config } from "dotenv";
config();

app.listen(process.env.PORT || 3030, () => {
  console.log("✅Application started running.");
});
