const express = require("express");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerJsDocs = YAML.load("./api.yaml");
const app = express();
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));
app.use("/string", (req, res) => {
  res.send("Hello world");
  console.log("hello world");
});

app.listen(4000, () => {
  console.log("running ");
});
