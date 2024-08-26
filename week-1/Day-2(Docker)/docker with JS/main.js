const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  return res.json({ message: "hello from Rushikesh" });
});
app.listen(PORT, () => console.log(`server started on ${PORT}`));
