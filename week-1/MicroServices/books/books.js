const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("this is our main endpoint");
});

app.listen(4545, () => {
  console.log("server is running --Books");
});
