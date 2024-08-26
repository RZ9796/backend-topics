const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });
//
// swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");
const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongoose.connect(process.env.MONGO_URL);
app.use(express.json());
app.use(cors({ origin: "http://localhost:4000", credentials: true }));

app.use("/", require("./routes/todoRoute"));

app.use("*", (req, res) => {
  res.status(404).json({ message: "No resource found" });
});

app.use((err, req, res, next) => {
  console.log(err);
  return res
    .status(500)
    .json({ message: err.message || "Something went wrong" });
});

mongoose.connection.once("open", () => {
  console.log("Mongo Connected");
  app.listen(process.env.PORT, console.log("Server Running"));
});
