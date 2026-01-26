import app from "./app";

app.listen(process.env.PORT || 3030, () => {
  console.log("✅Application started running.");
});
