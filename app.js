const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");

const fs = require("fs");
const { UserRoute } = require("./src/routes");
const { SocialRoute } = require("./src/routes");

const app = express();
const port = process.env.PORT || 8080;
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use([
  bodyParser.json(),
  bodyParser.urlencoded({
    extended: true,
  }),
]);
app.use(express.static("public"));
app.use([UserRoute, SocialRoute]);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
