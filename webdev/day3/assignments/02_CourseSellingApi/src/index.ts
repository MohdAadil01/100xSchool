import app from "./app";

const PORT = process.env.PORT;
console.log(process.env.DATABASE_URL);
app.listen(PORT || 3000, () => {
  console.log("✅Server running on port " + PORT);
});
