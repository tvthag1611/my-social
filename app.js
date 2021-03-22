import express from "express";
const bodyParser = require("body-parser");

const app = express();
const config = require("./src/config/database");
app.use([
  bodyParser.json(),
  bodyParser.urlencoded({
    extended: true,
  }),
]);
app.use(express.static("public"));
app.use("/", (req, res, next) => {
  res.json("Hello");
});

app.listen(config.api_port);
