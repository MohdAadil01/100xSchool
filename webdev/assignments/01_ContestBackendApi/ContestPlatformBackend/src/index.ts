import app from "./app";
import { config } from "dotenv";

config();

app.listen(process.env.PORT || 3000, () => {
  console.log("App listening");
});
