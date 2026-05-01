import app from "./app";

app.listen(process.env.PORT || 3000, () => {
  console.log("Process running on port 3000");
});
