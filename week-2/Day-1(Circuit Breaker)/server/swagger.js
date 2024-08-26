const swaggerAutogen = require("swagger-autogen")();

const doc = {
  openapi: "3.0.0",
  info: {
    title: "My API",
    description: "Description",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:4000",
    },
  ],
};

const outputFile = "./swagger-output.json";
const routes = ["./routes/todoRoute.js"];

swaggerAutogen(outputFile, routes, doc);
